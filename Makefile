deploy:
	scp -r ./build/card root@h5.fenxiangbei.com:/var/www/html/campaigns/
	rm -rf ./build/card

.PHONY: deploy
