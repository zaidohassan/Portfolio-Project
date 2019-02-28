(SELECT COUNT(*) FROM book WHERE date=$1)
UNION ALL
(SELECT rejectcount FROM rejecttable WHERE date=$1)
