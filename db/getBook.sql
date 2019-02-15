SELECT 
    b.title, b.salesrank, b.id, f.buyboxprice, f.costofgood, f.fbaprofit, f.mfprofit
FROM 
 book b
JOIN fees f
 ON b.id = f.fees_id
 WHERE b.date = $1 