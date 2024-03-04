export const Node=(function(){
    function newNode(thisData,leftC=null,rightC=null){
        const thisNode={
            data:thisData,
            left:leftC,
            right:rightC
        }
        return thisNode;
    }
    return{newNode};
})();

export const Tree=(function(){

    //declare root variable
    let root=null;

    //buildTree(array) takes an array of data and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!).
    //The buildTree function should return the level-0 root node.
    function buildTree(array){
        if(array.length===0){
            return null;
        }
        //remove duplicates
        let sortedArr=removeDuplicates(array);
        //sort in ascending order
        sortedArr.sort(function(a,b){return a-b});
        //console.log(sortedArr);
        let rootIndex=Math.ceil(sortedArr.length/2)-1;
        root=Node.newNode(sortedArr[rootIndex]);
        let leftBranch=sortedArr.slice(0,rootIndex);
        let rightBranch=sortedArr.slice(rootIndex+1,sortedArr.length);
        //console.log(leftBranch);
        //console.log(rightBranch);
        root.left=buildTraverse(leftBranch);
        root.right=buildTraverse(rightBranch);
        return root;


    }

    //recursive function to navigate and build the tree as we move to each branch
    function buildTraverse(branch){
        if(branch.length<=0){
            return null;
        }
        let thisRootIndex=Math.ceil(branch.length/2)-1;
        let thisRoot=Node.newNode(branch[thisRootIndex]);
        let thisLeft=branch.slice(0,thisRootIndex);
        let thisRight=branch.slice(thisRootIndex+1,branch.length);
        thisRoot.left=buildTraverse(thisLeft);
        thisRoot.right=buildTraverse(thisRight);
        return thisRoot;
    }


    //function to remove duplicate values
    function removeDuplicates(arr){
        return arr.filter((item,index)=>arr.indexOf(item)===index);
    }


    //prettyPrint() console.logs the tree in a structured format.
    //the node parameter expects to receive the root of the tree.
    function prettyPrint(node, prefix = "", isLeft = true){
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };


      //function getRoot()
      function getRoot(){
        return root;
      }

      //insert(value) inserts the given value into the tree
      function insert(value){
        if(value<root.data){
            return insertTraverse(root.left,value);
        }else if(value>root.data){
            return insertTraverse(root.right,value);
        }
      }

      //recursive function that compares the elements of each branch to the value
      function insertTraverse(currentBranch,value){
        //if branch is empty
        if(currentBranch==null){
            currentBranch=new Node.newNode(value);
            return currentBranch;
        }

        //if branch is not empty,
        //check if left branch is valid
        if(value<currentBranch.data){
            currentBranch.left=insertTraverse(currentBranch.left,value);
        }else if(value>currentBranch.data){
            currentBranch.right=insertTraverse(currentBranch.right,value);
        }
        return currentBranch;
      }


    return{
        buildTree,
        prettyPrint,
        getRoot,
        insert,

    }
})();



//test 1
//test buildTree(array)
Tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
let root=Tree.getRoot();
Tree.prettyPrint(root);
//test insert(value)
Tree.insert(10);
Tree.insert(2);
Tree.prettyPrint(root);


/*
//test 2
Tree.buildTree([5,11,12,14,15,18,19,21,23,25,27,28,30,32,37]);
let root=Tree.getRoot();
Tree.prettyPrint(root);
*/
