deploy:
	mv ./build ./campaigns
	scp -r ./campaigns root@h5.fenxiangbei.com:/var/www/html
	rm -rf ./campaigns

.PHONY: deploy
