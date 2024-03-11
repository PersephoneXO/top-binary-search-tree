import { Tree } from "./binary-search-tree.js";

//driver script
//function to generate random numbers
function generateNumber(){
    let min=Math.ceil(1);
    let max=Math.floor(99);
    return Math.floor(Math.random()*(max-min+1))+min;
}

//create array of random numbers
let randomArr=[];
for(let i=0;i<14;i++){
    randomArr.push(generateNumber());
}

//build tree
Tree.buildTree(randomArr);
let root=Tree.getRoot();
Tree.prettyPrint(root);
//Confirm that the tree is balanced by calling isBalanced.
console.log(Tree.isBalanced());
//print elements in level order
console.log(Tree.levelOrder());
//print elements in pre order
console.log(Tree.preOrder());
//print elements in post order
console.log(Tree.postOrder());
//print elements in order
console.log(Tree.inOrder());
//Unbalance the tree by adding several numbers > 100.
for(let i=0;i<5;i++){
    Tree.insert(generateNumber());
}
Tree.prettyPrint(root);
//Confirm that the tree is unbalanced by calling isBalanced.
console.log(Tree.isBalanced());
//Balance the tree by calling rebalance.
root=Tree.rebalance();
//Confirm that the tree is balanced by calling isBalanced.
console.log(Tree.isBalanced());
Tree.prettyPrint(root);
//print elements in level order
console.log(Tree.levelOrder());
//print elements in pre order
console.log(Tree.preOrder());
//print elements in post order
console.log(Tree.postOrder());
//print elements in order
console.log(Tree.inOrder());
