yarn generate
ssh df-sg-test "
  rm -rf /var/www/kontext-www
  exit
"
scp -r out df-sg-test:/var/www/kontext-www
ssh df-sg-test "
  chmod -R 777 /var/www/kontext-www
  exit
"