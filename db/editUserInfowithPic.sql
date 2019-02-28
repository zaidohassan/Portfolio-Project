UPDATE users
SET email = $2,
image_url = $3
WHERE user_id = $1
RETURNING *;
