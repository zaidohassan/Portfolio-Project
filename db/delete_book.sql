DELETE FROM book 
WHERE id = $1;
DELETE FROM fees
WHERE fees_id = $1
 
