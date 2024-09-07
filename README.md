# 2024 台北秋季程式設計節


### Some Github Commands

* Remember to save and git add, git commit before downloading

1. upload

```shell
git add .
git commit -m "your comments"
git push
```

2. download

```shell
git fetch origin <branchName>
git checkout master
git merge origin/<branchName>
```

3. new branch

```shell
git checkout -b <branchName>
```

4. switch branch

```shell
git checkout <branchName>
```

5. delete a local branch

 ```shell
 git branch -D <branchName>
 ```

6. delete a remote branch

 ```shell
 git push origin --delete <remoteBranchName>
 ```

7. merge branch

```shell
git checkout master
git merge <branchName>
```