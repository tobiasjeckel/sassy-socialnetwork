DO
$do$
BEGIN
   FOR i IN 2..201 LOOP
      INSERT INTO friendships
         (receiver_id, sender_id, accepted)
      VALUES (i, 1, true);
   END LOOP;
END
$do$;


INSERT INTO chats (sender_id, message)
VALUES (1, 'Hey this is the second message from Tom');
