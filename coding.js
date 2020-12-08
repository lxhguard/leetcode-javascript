/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    const RM = 2; // 最大重复次数
    let slow = 0; // 慢指针 - 写
    
    for (fast in nums){ // 快指针 - 读
        if(slow < RM || nums[fast] != nums[slow - RM]) {
            nums[slow] = nums[fast];
            slow++;
        }
    }
    return slow;
};

nums = 