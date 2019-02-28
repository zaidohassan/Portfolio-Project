DO $$
BEGIN 
IF EXISTS(SELECT FROM rejecttable WHERE date=$1)
THEN
UPDATE rejecttable
SET rejectcount= rejectcount + 1
WHERE date=$1;
ELSIF NOT EXISTS(
SELECT FROM rejecttable WHERE date=$1)
THEN
INSERT INTO rejecttable (rejectcount)
VALUES (1);
END IF;
END $$
