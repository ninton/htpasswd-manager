htpasswd-manager - csvファイルを .htpasswdファイル .htgroupファイルへ変換するCLIコマンド
======

## インストール

```
$ npm install -g htpasswd-manager
```


## 使い方

```
$ htpasswd-manager ユーザー一覧CSVファイル .htpasswd
$ htgroup-manager  ユーザー一覧CSVファイル .htgroup
```

## ユーザー一覧CSVファイル

./sample_user_passwd.csv をコピーして、LibreOfiice Calcなどで編集保存してください。


```
username,password,groups,is_deleted,comment
taro,1234,,1,deleted on 2019-06-16, by webmaster
jiro,1234,"staff,webmaster",,
saburo,1234,webmaster,,
```

1行目は、username,password,groups,is_deleted,comment の固定です、編集しないようにお願いします。

* username - ユーザー名。英数字アンダーバー以外の文字は動作未確認です。
* password - パスワード。
* groups - 特にない場合は空欄のまま。複数ある場合は、LibreOffice Calcで編集しているなら、セル内にカンマ区切りで記述してください。
* is_deleted - 1:そのユーザーを削除します。
* comment - コメントです。日付、編集者、理由などを書いてください。

