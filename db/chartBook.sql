SELECT 
SUM (
    CASE 
    WHEN salesrank < 100000 THEN
    1 
    ELSE
    0 
    END
) AS "SALESRANK1",
SUM (
    CASE 
    WHEN salesrank >= 100000 AND salesrank < 500000 THEN
    1 
    ELSE
    0 
    END
) AS "SALESRANK2",
SUM (
    CASE 
    WHEN salesrank >= 500000 AND salesrank < 1000000 THEN
    1 
    ELSE
    0 
    END
) AS "SALESRANK3",
SUM (
    CASE 
    WHEN salesrank >= 1000000 AND salesrank < 5000000 THEN
    1 
    ELSE
    0 
    END
) AS "SALESRANK4",
SUM (
    CASE 
    WHEN salesrank >= 5000000 THEN
    1 
    ELSE
    0 
    END
) AS "SALESRANK5"
FROM book
WHERE date = $1