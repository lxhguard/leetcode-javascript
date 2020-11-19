## 题目描述

输入两个链表，找出它们的第一个公共节点。

示例 1：
输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
输出：Reference of the node with value = 8
输入解释：相交节点的值为 8 （注意，如果两个列表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
 
示例 2：
输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
输出：Reference of the node with value = 2
输入解释：相交节点的值为 2 （注意，如果两个列表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。

示例 3：
输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
输出：null
输入解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
解释：这两个链表不相交，因此返回 null。

注意：
**如果两个链表没有交点，返回 null.**
**在返回结果后，两个链表仍须保持原有的结构**。
可假定整个链表结构中没有循环。
**程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。**
本题与主站 160 题相同：https://leetcode-cn.com/problems/intersection-of-two-linked-lists/

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 题解一：哈希表

解题思路：遍历A链表，使用hash存储 key:value 即 节点：1；
遍历B链表，每遍历一个节点，查询hash表中是否存在，若存在则为相交节点；
遍历B链表结束，hash表中不存在，则不相交。

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    const hash = new Map();
    let node = headA;
    while (node) {
        hash.set(node, 1);
        node = node.next;
    }
    node = headB;
    while (node) {
        if (hash.has(node)) return node;
        node = node.next;
    }
    return null;
};
```

复杂度：

时间复杂度：O(N)

空间复杂度：O(N)

## 题解二：双指针之 同速指针

解题思路：

- 假设**A链表**长度为 **L1+S**，**B链表**长度为 **L2+S**（S>0）
- 解：nodeA,nodeB分别指向A、B链表的头部，同速度向后移动。
- 当nodeA移动到A链表尾部时，此时nodeA已移动距离为**L1+S**，下一步将nodeA指向B链表头部。
- 当nodeB移动到B链表尾部时，此时nodeB已移动距离为**L2+S**，下一步将nodeB指向A链表头部。
- 若AB链表有交点，此时nodeA、nodeB分别移动距离为**L2、L1**，他们的移动距离相同，均为**L1+L2+S**，此时为**相交节点**。
- 如果没有交集，继续移动至nodeA指向B链表尾节点，即nodeB指向A链表尾节点，两个指针再向后移动一个节点，此时nodeA、nodeB移动距离为**L1+L2+2S**，两个指针同时指向**null**, 循环条件不满足，循环结束。

> PS: 在第一次相遇之前，nodeA指向null时，nodeB不为null，所以不会跳出循环。nodeB指向null时同理。

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let nodeA = headA, nodeB = headB;
    while (nodeA !== nodeB) {
        nodeA = (nodeA !== null)? nodeA.next: headB;
        nodeB = (nodeB !== null)? nodeB.next: headA;
    }
    return nodeA;
};
```

复杂度分析

- 时间复杂度：O(M+N)。
- 空间复杂度：O(1)。

## 题解三：双栈弹出法

解题思路：两个栈来分别保存两个链表，分别从栈顶弹出元素进行比较，如果有交点，则交点之后的元素一直相同，则遇到的第一对不相同的元素，其之前为交点intersection；如果没有交点，则返回null，故初始化intersection为null.

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    const stackA = [],  stackB = [];
    let nodeA = headA, nodeB = headB;
    let intersection = null;
    while (nodeA) {
        stackA.push(nodeA);
        nodeA = nodeA.next;
    }
    while (nodeB) {
        stackB.push(nodeB);
        nodeB = nodeB.next;
    }
    while (stackA.length && stackB.length) {
        let A = stackA.pop();
        if (A === stackB.pop()) {
            intersection = A;
        }
    }
    return intersection;
};
```
