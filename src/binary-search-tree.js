export const Node=(function(){
    function newNode(thisData,leftC,rightC){
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

    //buildTree(array) takes an array of data and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!).
    //The buildTree function should return the level-0 root node.
    const buildTree=(array)=>{
        //remove duplicates
        let sortedArr=removeDuplicates(array);
        //sort in ascending order
        sortedArr.sort(function(a,b){return a-b});

    }

    //function to remove duplicate values
    function removeDuplicates(arr){
        return arr.filter((item,index)=>arr.indexOf(item)===index);
    }


    //prettyPrint() console.logs the tree in a structured format.
    //the node parameter expects to receive the root of the tree.
    const prettyPrint = (node, prefix = "", isLeft = true) => {
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





    return{
        buildTree,
        prettyPrint,

    }
})();


Tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
