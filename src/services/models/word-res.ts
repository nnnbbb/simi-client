export interface WordRes {
  /**
   * @description: 主键
   */
  id: number;

  /**
   * @description: 创建时间
   */
  createdAt: string;

  /**
   * @description: 更新时间
   */
  updatedAt: string;

  /**
   * @description: 删除时间
   */
  deletedAt: string;

  /**
   * @description: 删除id
   */
  deletedId?: string;

  /**
   * @description: 单词
   */
  word: string;

  /**
   * @description: 音标
   */
  phoneticSymbol: string;

  /**
   * @description: 中文
   */
  chinese: string;

  /**
   * @description: 记录时间
   */
  recordTime: string;

  /**
   * @description: 记忆次数
   */
  memoryTimes?: string;
}
