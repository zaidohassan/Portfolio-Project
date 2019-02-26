UPDATE users
SET email = $2
WHERE user_id = $1
RETURNING *;
