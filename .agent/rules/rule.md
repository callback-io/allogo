---
trigger: always_on
glob:
description:
---

# Gemini Added Memories

## 语言设置

- 所有对话、解释默认使用中文
- 注释默认使用英文
- 变量名、函数名使用英文（遵循编程规范）
- git commit 信息使用英文描述

## 代码注释规范

- 函数和类必须有英文注释说明用途
- 复杂逻辑需要行内英文注释
- TODO 和 FIXME 使用英文描述

## 包管理工具

- 项目使用的包管理工具是 pnpm

## 任务执行

- 任务执行过程中要及时提示正在完成的事哪个任务
- 任务完成后要及时在前面打钩
- 任务执行完要执行一次 eslint 和 ts 检查，解决报错和告警

## 命名规范

- 项目的文件名和目录名遵循小驼峰命名法 (lowerCamelCase)，组件文件遵循大驼峰命名法 (PascalCase)。

## 代码检查

- 每次修改完代码要执行 eslint 检查和 ts 检查

## Gemini Added Memories

- 代码修改完成后，我不能暂存或提交，必须等待用户 Review。
