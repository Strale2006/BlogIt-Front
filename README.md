# Balkanflix


### NIKAKO NE SPAJATI KOD NA GITHUB AKO POSTOJI GRESKA U NJEMU

### Basic Commands:
1. **`git init`**: Initialize a new Git repository.
2. **`git clone <repository-url>`**: Clone a repository from a remote source.
3. **`git add <file>`**: Stage changes for commit.
4. **`git commit -m "Commit message"`**: Commit staged changes with a message.
5. **`git status`**: Show the status of changes as untracked, modified, or staged.
6. **`git diff`**: Show changes between commits, commit and working tree, etc.
7. **`git log`**: Show the commit history.
8. **`git pull`**: Fetch changes from a remote repository and merge them into the current branch.
9. **`git push`**: Push changes to a remote repository.

### Branching and Merging:
10. **`git branch`**: List all branches in the repository.
11. **`git branch <branch-name>`**: Create a new branch.
12. **`git checkout <branch-name>`**: Switch to a different branch.
13. **`git merge <branch-name>`**: Merge changes from one branch into the current branch.
14. **`git branch -d <branch-name>`**: Delete a branch locally.
15. **`git push origin --delete <branch-name>`**: Delete a remote branch.
16. **`git merge --abort`**: Abort the merge process and restore the original branch state.
17. **`git stash`**: Temporarily save changes that are not ready to be committed.
18. **`git stash apply`**: Apply the most recent stash and remove it from the stash list.

### Collaborating with Others:
19. **`git remote -v`**: View remote repositories.
20. **`git remote add <name> <url>`**: Add a new remote repository.
21. **`git remote remove <name>`**: Remove a remote repository.
22. **`git fetch <remote>`**: Fetch changes from a remote repository.
23. **`git pull <remote> <branch>`**: Fetch changes from a remote repository and merge them.
24. **`git push <remote> <branch>`**: Push changes to a remote repository.
25. **`git pull --rebase <remote> <branch>`**: Fetch and reapply commits from a remote repository.
26. **`git push --force <remote> <branch>`**: Force-push changes to a remote repository (use with caution).

### Undoing Changes:
27. **`git reset <file>`**: Unstage changes for the specified file.
28. **`git reset --soft <commit>`**: Reset staging area and leave changes in the working directory.
29. **`git reset --hard <commit>`**: Discard all changes and reset to a specific commit.
30. **`git revert <commit>`**: Create a new commit that undoes changes made in a previous commit.
31. **`git cherry-pick <commit>`**: Apply changes from a specific commit to the current branch.
