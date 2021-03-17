Create DATABASE IF NOT EXISTS splitwise;

USE `splitwise`;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users`(
    `user_id` INT(10) NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(25) NOT NULL,
    `email_id` VARCHAR(25) NOT NULL,
    `password` VARCHAR(25) NOT NULL,
    `phone` VARCHAR(15) DEFAULT NULL,
    `language` VARCHAR(10) DEFAULT 'ENG',
    `currency` VARCHAR(3) DEFAULT NULL,
    `timezone` VARCHAR(255) DEFAULT NULL,
    `profile_image` VARCHAR(255),
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `email_id_UNIQUE` (`email_id`)
);

DROP TABLE IF EXISTS `groups`;

CREATE TABLE `groups`(
    `group_id` INT(10) NOT NULL AUTO_INCREMENT,
    `group_name` VARCHAR(255) NOT NULL,
    `group_image` VARCHAR(255),
    PRIMARY KEY (`group_id`),
    UNIQUE KEY `group_name_UNIQUE` (`group_name`)
);

DROP TABLE IF EXISTS `groups_users`;

CREATE TABLE `groups_users`(
    `group_user_id` INT(10) NOT NULL AUTO_INCREMENT,
    `group_id` INT(10) NOT NULL,
    `user_id` INT(10) NOT NULL,
    `is_member` VARCHAR(5),
    PRIMARY KEY (`group_user_id`),
    INDEX `group_user_composite` (`group_id`, `user_id`)
);

DROP TABLE IF EXISTS `bills`;

CREATE TABLE `bills` (
    `bill_id` INT(10) NOT NULL AUTO_INCREMENT,
    `group_id` INT(10) NOT NULL,
    `bill_name` VARCHAR(25) NOT NULL,
    `user_paid_id` INT(10) NOT NULL,
    `amount` INT(10) NOT NULL,
    `time_added` TIMESTAMP NOT NULL,
    `settledup` VARCHAR(1),
    PRIMARY KEY (`bill_id`),
    FOREIGN KEY (`group_id`) REFERENCES `groups`(`group_id`),
    FOREIGN KEY (`user_paid_id`) REFERENCES `users`(`user_id`)
);

DROP TABLE IF EXISTS `bill_transaction`;

CREATE TABLE `bill_transaction` (
    `transaction_id` INT(10) NOT NULL AUTO_INCREMENT,
    `bill_id` INT(10) NOT NULL,
    `user_id` INT(10) NOT NULL,
    `owed_user_id` INT(10) NOT NULL,
    `amount` DOUBLE NOT NULL,
    -- `settle` VARCHAR(1),
    -- `split_amount` INT(10) NOT NULL,
    -- `bill_created_at` TIMESTAMP NOT NULL,
    PRIMARY KEY (`transaction_id`),
    -- FOREIGN KEY (`bill_id`) REFERENCES `bills`(`bill_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
    FOREIGN KEY (`owed_user_id`) REFERENCES `users`(`user_id`)
);



DROP PROCEDURE IF EXISTS `get_login`;
DELIMITER ;;
CREATE PROCEDURE `get_login` (
    _email VARCHAR(25)
)
BEGIN 
    IF EXISTS(SELECT user_id FROM users WHERE email_id = _email) THEN
		SELECT user_id, email_id, password, user_name, phone,language, currency,timezone, 1 AS status FROM users WHERE email_id = _email;
	ELSE
		SELECT 0 AS status;
	END IF;
END ;;
DELIMITER ;

DROP PROCEDURE IF EXISTS `post_signup`;
DELIMITER ;;
CREATE PROCEDURE `post_signup` (
    _email VARCHAR(25),
    _password VARCHAR(25),
    _username VARCHAR(25)
)
BEGIN 
    IF NOT EXISTS(SELECT email_id FROM users WHERE email_id = _email) THEN
        INSERT INTO users(user_name, email_id, password) VALUES (_username, _email, _password);
		SELECT 1 AS status ;
	ELSE
		SELECT 0 AS status;
	END IF;
END ;;
DELIMITER ;

DROP PROCEDURE IF EXISTS `create_group`;
DELIMITER ;;
CREATE PROCEDURE `create_group` (
    _user_id INT,
    _group_name VARCHAR(255)
)
BEGIN
    DECLARE _group_id INT;
    IF EXISTS(SELECT group_name FROM groups WHERE group_name = TRIM(_group_name)) THEN
        SELECT 0 AS status;
        -- SELECT group_id INTO _group_id FROM groups WHERE group_name = TRIM(in_group_name);
        -- INSERT INTO groups_users (group_id, user_id, is_member) VALUES(_group_id, in_user_id, 'Y');
    ELSE
        INSERT INTO groups (group_name) VALUES (_group_name);
        SELECT group_id INTO _group_id FROM groups WHERE group_name = _group_name;
        INSERT INTO groups_users (user_id, group_id, is_member) VALUES (_user_id, _group_id, 'Y');
        SELECT 1 AS status;
    END IF;
END ;;
DELIMITER ;

DROP PROCEDURE IF EXISTS `invite_to_group`;
DELIMITER ;;
CREATE PROCEDURE `invite_to_group` (
    _email_id VARCHAR(255),
    _group_name VARCHAR(255)
)
sp: BEGIN
        DECLARE _group_id INT;
        DECLARE _user_id INT;

        IF EXISTS(SELECT user_id FROM users WHERE email_id = _email_id) THEN
            SELECT user_id INTO _user_id FROM users WHERE email_id = _email_id;
        ELSE
            SELECT "USER DOES NOT EXISTS" AS status;
            LEAVE sp;
        END IF;

        IF EXISTS(SELECT group_id FROM groups WHERE group_name = TRIM(_group_name)) THEN
                SELECT group_id INTO _group_id FROM groups WHERE group_name = _group_name;
        ELSE
            SELECT "GROUP DOES NOT EXISTS" AS status;
            LEAVE sp;
        END IF;
        
        IF EXISTS(SELECT user_id FROM groups_users WHERE user_id = _user_id AND group_id = _group_id) THEN
            SELECT "USER ALREADY INVITED" AS status;
        ELSE
            INSERT INTO groups_users (user_id, group_id, is_member) VALUES (_user_id, _group_id, 'N');
            SELECT "INVITATION SENT TO THE USER" AS status;
        END IF;
END ;;
DELIMITER ;



DROP PROCEDURE IF EXISTS `group_invite_accept`;
DELIMITER ;;
CREATE PROCEDURE `group_invite_accept` (
    _user_id INT,
    _group_name VARCHAR(255)
    -- in_group_image VARCHAR(255)
)
BEGIN
    UPDATE groups_users SET is_member = 'Y' WHERE user_id = _user_id;
    SELECT "INVITATION ACCEPTED" AS status;
    
END ;;
DELIMITER ;


DROP PROCEDURE IF EXISTS `add_expense`;
DELIMITER ;;
CREATE PROCEDURE `add_expense` (
    _group_id INT,
    _bill_name VARCHAR(255),
    _user_paid_id INT,
    _bill_amount DOUBLE
)
BEGIN
    DECLARE _bill_id INT;

    INSERT INTO bills (group_id, bill_name, user_paid_id, amount, time_added, settledup) 
    VALUES (_group_id,_bill_name,_user_paid_id,_bill_amount,NOW(),'F');

    SELECT max(bill_id) INTO _bill_id FROM bills WHERE bill_name = _bill_name AND group_id = _group_id;

    INSERT INTO bill_transaction ( bill_id, user_id, owed_user_id, amount)
    SELECT b.bill_id,
            b.user_paid_id AS user_id,
            b1.owed_user_id AS owed_user_id,
            (b.amount / b2.group_members) AS amount
    FROM bills b 
    JOIN (
        SELECT count(groups_users.user_id) AS group_members, 
                b.group_id, 
                b.bill_id
        FROM bills b 
        JOIN groups_users 
        ON b.group_id = groups_users.group_id 
        AND groups_users.is_member = 'Y'
        GROUP BY b.group_id, b.bill_id
    ) b2 
    ON b.group_id = b2.group_id 
    AND b.bill_id = b2.bill_id
    JOIN
    (
        SELECT user_id AS owed_user_id, 
                bills.bill_id
        FROM bills 
        JOIN groups_users 
        ON bills.group_id = groups_users.group_id 
        AND bills.user_paid_id <> groups_users.user_id
        AND groups_users.is_member = 'Y'
    ) b1 
    ON b.bill_id = b1.bill_id
    WHERE b.bill_id = _bill_id;

    SELECT "BILL_ADDED" AS status;

END ;;
DELIMITER ;


--------------------------------------------

to get balances
select collect_amount-owed_amount 
from (select ifnull(sum(amount),0) as collect_amount
from bill_transaction
where user_id=1 and owed_user_id=4) as s1 join
(select ifnull(sum(amount),0) as owed_amount
from bill_transaction
where user_id=4 and owed_user_id=1) as s2;

select distinct gu2.user_id as owed_user_id from groups_users gu1 join groups_users gu2 on gu1.user_id <> gu2.user_id;


--------------------------------------------------------------------

-- get recent activity
SELECT b.bill_id, 
        b.bill_name, 
        b.amount, 
        g.group_name, 
        -- u.user_id,
        b.user_paid_id, 
        gu.user_id,
        u.user_name,
        CASE 
            WHEN gu.user_id = b.user_paid_id 
            THEN 'GET' 
            ELSE 'PAY' 
        END AS pay_get, 
        CASE 
            WHEN gu.user_id = b.user_paid_id 
            THEN (b.amount / gu_count.no_of_users) *  (gu_count.no_of_users - 1)
            ELSE (b.amount / (gu_count.no_of_users))
        END AS split_amount,
        b.time_added
FROM bills b
LEFT JOIN groups g ON b.group_id = g.group_id
LEFT JOIN groups_users gu ON b.group_id = gu.group_id
LEFT JOIN users u ON gu.user_id = u.user_id 
LEFT JOIN (
    SELECT count(user_id) AS no_of_users,
            group_id
    FROM groups_users gu
    GROUP BY group_id
) gu_count ON b.group_id = gu_count.group_id
WHERE u.user_id = _user_id
ORDER BY b.time_added _order ;


DROP PROCEDURE IF EXISTS `recent_activity`;
DELIMITER ;;
CREATE PROCEDURE `recent_activity` (
    _user_id INT
)
BEGIN
    SELECT b.bill_id, 
        b.bill_name, 
        b.amount, 
        g.group_name, 
        b.user_paid_id, 
        gu.user_id,
        u.user_name,
        CASE 
            WHEN gu.user_id = b.user_paid_id 
            THEN 'GET' 
            ELSE 'PAY' 
        END AS pay_get, 
        CASE 
            WHEN gu.user_id = b.user_paid_id 
            THEN (b.amount / gu_count.no_of_users) *  (gu_count.no_of_users - 1)
            ELSE (b.amount / (gu_count.no_of_users))
        END AS split_amount,
        b.time_added
    FROM bills b
    LEFT JOIN groups g ON b.group_id = g.group_id
    LEFT JOIN groups_users gu ON b.group_id = gu.group_id
    LEFT JOIN users u ON gu.user_id = u.user_id 
    LEFT JOIN (
        SELECT count(user_id) AS no_of_users,
                group_id
        FROM groups_users gu
        GROUP BY group_id
    ) gu_count ON b.group_id = gu_count.group_id
    WHERE u.user_id = _user_id
    ORDER BY b.time_added DESC ;
END ;;
DELIMITER ;

DROP PROCEDURE IF EXISTS `get_profile`;
DELIMITER ;;
CREATE PROCEDURE `get_profile` (
    _user_id  INT
)
BEGIN
    SELECT user_id, email_id, password, user_name, phone, currency, language, timezone FROM users WHERE user_id = _user_id;
    SELECT 1 as status;
END ;;
DELIMITER ;


DROP PROCEDURE IF EXISTS `update_profile`;
DELIMITER ;;
CREATE PROCEDURE `update_profile` (
    _user_id  INT,
    _user_name VARCHAR(255),
    _email_id VARCHAR(255),
    _phone VARCHAR(15),
    _currency VARCHAR(3),
    _language VARCHAR(255),
    _timezone VARCHAR(255)
)
BEGIN
    DECLARE num_users INT;
    SELECT COUNT(1) INTO num_users FROM users WHERE user_id = _user_id;
    IF num_users > 0 THEN
        UPDATE users SET email_id = _email_id, user_name = _user_name, phone = _phone, currency = _currency, language = _language, timezone = _timezone WHERE user_id = _user_id;
        SELECT 1 AS status FROM users;
    ELSE
        SELECT 0 AS status;
    END IF;
END ;;
DELIMITER ;


DROP PROCEDURE IF EXISTS `get_groups`;
DELIMITER ;;
CREATE PROCEDURE `get_groups` (
    _user_id INT
)
BEGIN
    
    SELECT g.group_name, gu.is_member
    FROM groups g JOIN groups_users gu
    ON g.group_id = gu.group_id
    WHERE gu.user_id = _user_id;
    SELECT 1 AS status;
    
END ;;
DELIMITER ;


-- DROP PROCEDURE IF EXISTS `get_groups`;
-- DELIMITER ;;
-- CREATE PROCEDURE `get_groups` (
--     _user_id INT
-- )
-- BEGIN
--     SELECT group_name, is_member
--         FROM groups 
--         WHERE group_id IN (
--             SELECT group_id 
--             FROM groups_users 
--             WHERE user_id = _user_id 
--         );
--     SELECT 1 AS status;
-- END ;;
-- DELIMITER ;

-- DROP PROCEDURE IF EXISTS `display_group_invite`;
-- DELIMITER ;;
-- CREATE PROCEDURE `display_group_invite` (
--     _user_id INT,
-- )
-- BEGIN
--     SELECT group_name 
--     FROM groups 
--     WHERE group_id IN (
--         SELECT group_id 
--         FROM groups_users 
--         WHERE user_id = _user_id 
--         AND is_member = 'N'
--     );
    
-- END ;;
-- DELIMITER ;