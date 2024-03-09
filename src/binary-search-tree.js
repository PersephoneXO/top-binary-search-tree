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
      function insertTraverse(currentNode,value){
        //if branch is empty
        if(currentNode==null){
            currentNode=new Node.newNode(value);
            return currentNode;
        }

        //if branch is not empty,
        //check if left branch is valid
        if(value<currentNode.data){
            currentNode.left=insertTraverse(currentNode.left,value);
        }else if(value>currentNode.data){
            currentNode.right=insertTraverse(currentNode.right,value);
        }
        return currentNode;
      }

      //deleteItem(value) deletes the given value from the tree
      function deleteItem(value){
        if(root.data==value){
            return deleteTraverse(root,value);
        }else{
            if(value<root.data){
                return deleteTraverse(root.left,value);
            }else if(value>root.data){
                return deleteTraverse(root.right,value);
            }
        }
      }

      //recursive function that looks for the item to delete
      function deleteTraverse(currentNode,value){
        //console.log(currentNode);
        if(currentNode.data==value){
            //node has no children **case 1**
            if(currentNode.left==null&&currentNode.right==null){
                currentNode=null;
                return currentNode;
            }
            //node has 1 child **case 2 v1**
            if(currentNode.left==null&&currentNode.right!=null){
                currentNode=currentNode.right;
                return currentNode;
            }
            //node has 1 child **case 2 v2**
            if(currentNode.right==null&&currentNode.left!=null){
                currentNode=currentNode.left;
                return currentNode;
            }
            //has has both children **case 3**
            if(currentNode.right!=null&&currentNode.left!=null){
                let succParent=currentNode;
                //find the successor
                let succ=currentNode.right;
                while(succ.left!=null){
                    succParent=succ;
                    succ=succ.left;
                }
                //the successor is always the left child of its parent so we can safely make the successor's right right child as left of its parent
                //if no successor, then assign succ.right to succParent.right
                //credit: https://www.geeksforgeeks.org/deletion-in-binary-search-tree/
                if(succParent!=currentNode){
                    succParent.left=succ.right;
                }else{
                    succParent.right=succ.right;
                }
                //copy the successor's data to the currentNode
                currentNode.data=succ.data;

                //delete successor
                succ=null;
                return currentNode;
            }
        }else{
            if(value<currentNode.data){
                currentNode.left=deleteTraverse(currentNode.left,value);
            }else if(value>currentNode.data){
                currentNode.right=deleteTraverse(currentNode.right,value);
            }
        }
        return currentNode;
      }

      //find(value) returns the node with the given value
      function find(value){
        if(root.data==value){
            return root;
        }else{
            if(value<root.data){
                return findTraverse(root.left,value);
            }else if(value>root.data){
                return findTraverse(root.right,value);
            }
        }
      }

      //recursive function that searches for the node with the given value in the tree
      function findTraverse(currentNode,value){
        //if the node in question does not exist
        if(currentNode==null){
            return null;
        }
        if(currentNode.data==value){
            return currentNode;
        }else{
            if(value<currentNode.data){
                return findTraverse(currentNode.left,value);
            }else if(value>currentNode.data){
                return findTraverse(currentNode.right,value);
            }
        }
      }

      //levelOrder(callback) accepts an optional callback function as a parameter,
      //and should traverse the tree in breadth-first level order and provide each node as an argument to the callback
      function levelOrder(callback=null){
        let queue=[root];
        let finalArr=[];
        while(queue.length!=0){
            let currentNode=queue.shift();
            finalArr.push(currentNode.data);
            if(currentNode.left!=null){
                queue.push(currentNode.left);
            }
            if(currentNode.right!=null){
                queue.push(currentNode.right);
            }
        }
        if(callback==null){
            return finalArr;
        }else{
            for(const ele of finalArr){
                callback(ele);
            }
        }

      }


      //inOrder(callback) accepts an optional callback as a parameter.
      //the order is (left => middle => right)
      function inOrder(callback=null){
        let queue=[];
        let finalArr=[];
        let currentNode=root;
        while(queue.length!=0||currentNode!=null){
            while(currentNode!=null){
                queue.push(currentNode);
                currentNode=currentNode.left;
            }
            let thisNode=queue.pop();
            finalArr.push(thisNode.data);
            currentNode=thisNode.right;
        }
        if(callback==null){
            return finalArr;
        }else{
            for(const ele of finalArr){
                callback(ele);
            }
        }
      }


      //preOrder(callback) accepts an optional callback as a parameter.
      //the order is (root => left branch (left to right) => right branch (left to right))
      function preOrder(callback=null){
        let queue=[root];
        let finalArr=[];
        while(queue.length!=0){
            let currentNode=queue.pop();
            finalArr.push(currentNode.data);
            if(currentNode.right!=null){
                queue.push(currentNode.right);
            }
            if(currentNode.left!=null){
                queue.push(currentNode.left);
            }
        }
        if(callback==null){
            return finalArr;
        }else{
            for(const ele of finalArr){
                callback(ele);
            }
        }
      }


      //postOrder(callback) accepts an optional callback as a parameter.
      //the order is (left branch (left to right (level order from bottom)) => right branch (left to right (level order from bottom)) => root)
      //first attempt
      /*function postOrder(callback=null){
        let queue=[root];
        let finalArr=[];
        while(queue.length!=0){
            let currentNode=queue[queue.length-1];
            if(currentNode.left!=null){
                queue.push(currentNode.left);
                currentNode.left=null;
            }else if(currentNode.right!=null){
                queue.push(currentNode.right);
                currentNode.right=null;
            }else{
                finalArr.push(queue.pop().data);

            }
        }
        if(callback==null){
            return finalArr;
        }else{
            for(const ele of finalArr){
                callback(ele);
            }
        }
      }*/
      //second attempt
      function postOrder(callback=null){
        let finalArr=[];

        function postOrderTraverse(currentNode){
            if(currentNode==null){
                return;
            }else{
                postOrderTraverse(currentNode.left);
                postOrderTraverse(currentNode.right);
                finalArr.push(currentNode.data);
            }
        }

        postOrderTraverse(root);
        if(callback==null){
            return finalArr;
        }else{
            for(const ele of finalArr){
                callback(ele);
            }
        }
      }




      //height(node) returns the given node's height.
      //height is defined as the number of edges in the longest path from the given node to a leaf node.
      function height(node){
        if(node===null){
            return 0;
        }
        let queue=[node];
        let height=-1;
        while(queue.length!=0){
            let size=queue.length;
            height++;
            while(size>0){
                let currentNode=queue.pop();
                if(currentNode.left!=null){
                    queue.push(currentNode.left);
                }
                if(currentNode.right!=null){
                    queue.push(currentNode.right);
                }
                size--;
            }
        }
        return height;
      }


      //depth(node) returns the given node's depth.
      //depth is defined as the number of edges in the path from a given node to the tree’s root node.
      function depth(node){
        if(node==root){
            return 0;
        }
        else{
            let queue=[root];
            let depth=0;
            while(queue.length!=0){
                let size=queue.length;
                depth++;
                while(size>0){
                    let currentNode=queue.pop();
                    if(currentNode==node){
                        return depth;
                    }else{
                        if(currentNode.left!=null){
                            queue.push(currentNode.left);
                        }
                        if(currentNode.right!=null){
                            queue.push(currentNode.right);
                        }
                        size--;
                    }
                }
            }
            return depth;
        }
      }


      //isBalanced() checks if the tree is balanced.
      //a balanced tree if one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.
      function isBalanced(){
        let flag=false;
        if(root==null){
            flag=true;
        }
        else{
            let leftHeight=height(root.left);
            let rightHeight=height(root.right);
            let heightDifference=leftHeight-rightHeight
            if(heightDifference==0||heightDifference==1){
                flag=true;
            }
        }
        return flag;
      }



    return{
        buildTree,
        prettyPrint,
        getRoot,
        insert,
        deleteItem,
        find,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
        height,
        depth,
        isBalanced,

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
//test deleteItem(value) **case 1**
Tree.deleteItem(2);
Tree.deleteItem(10);
Tree.prettyPrint(root);
//test deleteItem(value) **case 2**
Tree.deleteItem(1);
Tree.deleteItem(9);
Tree.prettyPrint(root);
//test deleteItem(value) **case 3**
/*
Tree.deleteItem(4);
Tree.prettyPrint(root);
Tree.deleteItem(8);
Tree.prettyPrint(root);
*/
//test find(value)
//console.log(Tree.find(8));
//console.log(Tree.find(5));
//console.log(Tree.find(324));
let node324=Tree.find(324);
//console.log(Tree.find(1));

//test levelOrder(callback)
console.log(Tree.levelOrder());
//test inOrder(callback)
console.log(Tree.inOrder());
//test preOrder(callback)
console.log(Tree.preOrder());
//test postOrder(callback)
console.log(Tree.postOrder());
//test height(node)
console.log(Tree.height(root));
console.log(Tree.height(node324));
//test depth(node)
console.log(Tree.depth(root));
console.log(Tree.depth(node324));
//test isBalanced()
console.log(Tree.isBalanced());



/*
//test 2
Tree.buildTree([5,11,12,14,15,18,19,21,23,25,27,28,30,32,37]);
let root=Tree.getRoot();
Tree.prettyPrint(root);
*/
