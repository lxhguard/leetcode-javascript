## 题目描述

输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。例如，一个链表有6个节点，从头节点开始，它们的值依次是1、2、3、4、5、6。这个链表的倒数第3个节点是值为4的节点。

示例：
给定一个链表: 1->2->3->4->5, 和 k = 2.
返回链表 4->5.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof

## 题解一：双指针之 间距k同速指针

解题思路：

- ans位于头节点，cur往后跑K个节点，指向第K个节点。
- ans和cur同速遍历链表，当cur位于尾节点时，ans位于倒数第K个节点，此时ans.val就是答案。

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {number}
 */
var kthToLast = function(head, k) {
    let ans = cur = head;
    // ans cur 间距为K
    while (--k) {
        cur = cur.next;
    }
    // cur指向尾节点，ans则为倒数第k个节点
    while (cur.next) {
        ans = ans.next;
        cur = cur.next;
    }
    return ans;
};
```

复杂度分析：
时间复杂度：O(N)
空间复杂度：O(1)

## 题解二：递归

解题思路：

- 终止条件：当节点head为空时，递归结束。
- 递归处理：递归调用
- 逻辑处理：当递归到链表尾时，往回走，归时开始记录节点，当count=k时 为倒数第k个节点，则返回；反之，返回空。


```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {number}
 */
var getKthFromEnd = function(head, k) {
    let count = 0; // 全局变量，累加至k
    const getReciprocalK = (head, k) => {
        // 终止条件
        if (head == null) return null;
        // 递归处理
        let value = getReciprocalK(head.next, k);
        // 逻辑处理：找到倒数第k个
        if (++count == k) return head;
        return value;
    }
    return getReciprocalK(head, k);
};
```

复杂度分析：
时间复杂度：O(N)
空间复杂度：O(1)
