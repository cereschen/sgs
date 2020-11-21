import type { Word } from 'languages';

export const markDictionary: Word[] = [
  { source: 'nightmare', target: '梦魇' },
  { source: 'ren', target: '忍' },
  { source: 'lie', target: '烈' },
  { source: 'nu', target: '暴怒' },
  { source: 'ying', target: '营' },
];

export const generalDictionary: Word[] = [
  { source: 'cheat', target: '作弊' },
  { source: 'cheat_description', target: '可以获得任意牌（仅用于测试）' },
  { source: 'standard', target: '标准版' },
  { source: 'legion_fight', target: '军争篇' },
  { source: 'wind', target: '风' },
  { source: 'forest', target: '林' },
  { source: 'fire', target: '火' },
  { source: 'mountain', target: '山' },
  { source: 'wei', target: '魏' },
  { source: 'shu', target: '蜀' },
  { source: 'wu', target: '吴' },
  { source: 'qun', target: '群' },
  { source: 'god', target: '神' },
  { source: 'unknown', target: '未知' },
  { source: 'lord', target: '主公' },
  { source: 'loyalist', target: '忠臣' },
  { source: 'rebel', target: '反贼' },
  { source: 'renegade', target: '内奸' },
  { source: 'seat 0', target: '一号位' },
  { source: 'seat 1', target: '二号位' },
  { source: 'seat 2', target: '三号位' },
  { source: 'seat 3', target: '四号位' },
  { source: 'seat 4', target: '五号位' },
  { source: 'seat 5', target: '六号位' },
  { source: 'seat 6', target: '七号位' },
  { source: 'seat 7', target: '八号位' },
  { source: 'you', target: '你' },
  { source: 'heart', target: '红桃' },
  { source: 'spade', target: '黑桃' },
  { source: 'club', target: '梅花' },
  { source: 'diamond', target: '方块' },
  { source: 'attack range:', target: '攻击距离：' },

  { source: 'draw stack', target: '摸牌堆' },
  { source: 'drop stack', target: '弃牌堆' },
  { source: 'hand area', target: '手牌区' },
  { source: 'equip area', target: '装备区' },
  { source: 'judge area', target: '判定区' },
  { source: 'outside area', target: '额外区域' },

  { source: 'prepare stage', target: '准备阶段' },
  { source: 'judge stage', target: '判定阶段' },
  { source: 'draw stage', target: '摸牌阶段' },
  { source: 'play stage', target: '出牌阶段' },
  { source: 'drop stage', target: '弃牌阶段' },
  { source: 'finish stage', target: '结束阶段' },

  { source: 'basic card', target: '基本牌' },
  { source: 'equip card', target: '装备牌' },
  { source: 'trick card', target: '锦囊牌' },
  { source: 'delayed trick card', target: '延时锦囊牌' },
  { source: 'armor card', target: '防具牌' },
  { source: 'weapon card', target: '武器牌' },
  { source: 'defense ride card', target: '防御马' },
  { source: 'offense ride card', target: '进攻马' },
  { source: 'precious card', target: '宝物牌' },
];

export const eventDictionary: Word[] = [
  { source: 'dead', target: '阵亡' },
  { source: 'alive', target: '存活' },
  { source: 'winners', target: '胜利玩家' },
  { source: 'losers', target: '战败玩家' },
  { source: 'back to lobby', target: '返回大厅' },
  { source: 'game over, winner is {0}', target: '游戏结束，{0} 胜利' },
  { source: 'turn overed', target: '翻面' },
  { source: 'option-one', target: '选项一' },
  { source: 'option-two', target: '选项二' },

  { source: 'yes', target: '是' },
  { source: 'no', target: '否' },
  { source: '({0})', target: '({0})' },
  { source: '[{0}]', target: '[{0}]' },
  { source: 'nosuit', target: '无色' },
  { source: 'red', target: '黑色' },
  { source: 'black', target: '红色' },
  { source: '[', target: '【' },
  { source: ']', target: '】' },
  { source: 'normal_property', target: '无属性' },
  { source: 'fire_property', target: '火属性' },
  { source: 'thunder_property', target: '雷属性' },
  { source: 'obtained', target: '获得' },
  { source: 'lost', target: '失去' },
  { source: '{0} {1} {2} {3} marks', target: '{0} {1}了 {2} 枚 {3} 标记' },
  { source: 'please choose a skill', target: '请选择一个技能' },
  { source: '{0} select nationaliy {1}', target: '{0} 选择了 {1} 势力' },
  {
    source: 'do you want to trigger skill {0} ?',
    target: '是否发动技能 【{0}】?',
  },
  {
    source: 'do you want to trigger skill {0} from {1} ?',
    target: '是否发动 {1} 的技能 【{0}】？',
  },
  {
    source: 'do you want to trigger skill {0} to {1} ?',
    target: '是否对 {1} 使用 【{0}】？',
  },
  {
    source: '{0} draws {1} cards',
    target: '{0} 摸了 {1} 张牌',
  },
  { source: '{0} is {1}, waiting for selecting a character', target: '{0} 是 {1}，正在等待其选将' },
  {
    source: 'your role is {0}, please choose a lord',
    target: '你的身份是 {0}, 请选择一名武将做为主公',
  },
  {
    source: 'lord is {0}, your role is {1}, please choose a character',
    target: '主公是【{0}】, 你的身份是 {1}, 请选择一名武将',
  },
  {
    source: 'please choose a character',
    target: '请选择一名武将',
  },
  {
    source: 'please choose a nationality',
    target: '请选择一个势力',
  },
  {
    source: 'please choose a card',
    target: '请选择一张牌',
  },
  {
    source: '{0} got judged card {2} on {1}',
    target: '{0} 的 {1} 判定结果为 {2}',
  },
  {
    source: '{0} recovered {2} hp for {1}',
    target: '{0} 使 {1} 回复了 {2} 点体力',
  },
  {
    source: '{0} recovered {1} hp',
    target: '{0} 回复了 {1} 点体力',
  },
  {
    source: '{0} lost {1} hp',
    target: '{0} 失去了 {1} 点体力',
  },
  { source: '{0} lost {1} max hp', target: '{0} 失去了 {1} 点体力上限' },
  { source: '{0} obtained {1} max hp', target: '{0} 获得了 {1} 点体力上限' },
  {
    source: '{0} used {1} to you, please use a {2} card',
    target: '{0} 对你使用了 {1}, 使用一张 【{2}】来响应',
  },
  {
    source: 'please use a {0} card to response {1}',
    target: '请使用一张【{0}】来响应 {1}',
  },
  {
    source: 'please response a {0} card to response {1}',
    target: '请打出一张【{0}】来响应 {1}',
  },
  {
    source: '{0} obtained skill {1}',
    target: '{0} 获得了技能 【{1}】',
  },
  {
    source: '{0} lost skill {1}',
    target: '{0} 失去了技能 【{1}】',
  },
  {
    source: 'please select to use a {0}',
    target: '请选择使用一张【{0}】',
  },
  { source: 'please use a {0} to player {1} to response {2}', target: '请对 {1} 使用一张【{0}】来响应 {2}' },
  { source: '{0} activated skill {1}', target: '{0} 的技能 【{1}】 被触发' },
  { source: '{0} activates awakening skill {1}', target: '{0} 的觉醒技 【{1}】 技能被触发' },
  { source: '{0} used skill {1}', target: '{0} 使用了技能【{1}】' },
  { source: '{0} used skill {1} to {2}', target: '{0} 使用了技能【{1}】, 目标是 {2}' },
  {
    source: '{0} hits {1} {2} hp of damage type {3}',
    target: '{0} 对 {1} 造成了 {2} 点【{3}】伤害',
  },
  {
    source: '{0} turned over the charactor card, who is {1} right now',
    target: '{0} 将武将牌翻面，现在是 {1}',
  },
  { source: 'facing up', target: '正面朝上' },
  { source: 'turning over', target: '背面朝上' },
  {
    source: '{0} got hurt for {1} hp with {2} property',
    target: '{0} 受到了 {1} 点【{2}】伤害',
  },
  { source: 'please choose a card', target: '请选择一张卡牌' },
  { source: '{0} obtains cards {1}', target: '{0} 获得了 {1} ' },
  {
    source: '{0} obtains cards {1} from {2}',
    target: '{0} 获得了 {2} 的一张 {1} ',
  },
  {
    source: '{0} obtains {1} cards from {2}',
    target: '{0} 获得了 {2} 的 {1} 张牌',
  },
  { source: 'please assign others no more than 2 handcards', target: '是否将至多两张手牌交给其他角色' },
  { source: '{0} obtains {1} cards', target: '{0} 获得了 {1} 张牌' },
  { source: 'please drop {0} cards', target: '请弃置 {1} 张牌' },
  { source: '{0} drops cards {1}', target: '{0} 弃置了 {1}' },
  { source: '{0} drops cards {1} by {2}', target: '{2} 弃置了 {0} 的一张 {1}' },
  { source: '{0} has been placed into drop stack', target: '{0} 置入了弃牌堆' },
  { source: '{0} has been placed on the top of draw stack', target: '{0} 置入了牌堆顶' },
  { source: '{0} has been placed on the bottom of draw stack', target: '{0} 置入了牌堆底' },
  { source: '{0} has been placed into drop stack from {1}', target: '{1} 将 {0} 置入了弃牌堆' },
  { source: '{0} has been placed on the top of draw stack from {1}', target: '{1} 将 {0} 置入了牌堆顶' },
  { source: '{0} has been placed on the bottom of draw stack from {1}', target: '{1} 将 {0} 置入了牌堆底' },
  { source: '{0} lost card {1}', target: '{0} 失去了 {1}' },
  { source: '{0} lost {1} cards', target: '{0} 失去了 {1} 张牌' },
  { source: '{0} used card {1}', target: '{0} 使用了一张 {1}' },
  { source: '{0} used skill {1}, response card {2}', target: '{0} 使用了技能 【{1}】，打出了一张 {2}' },
  { source: '{0} used skill {1}, use card {2}', target: '{0} 使用了技能 【{1}】，使用了一张 {2}' },
  { source: '{0} used skill {1}, use card {2} to {3}', target: '{0} 使用了技能 【{1}】，使用了一张 {2}，目标是 {3}' },
  { source: 'Please choose your slash target', target: '请选择【杀】的目标' },
  { source: 'draw stack top', target: '置于牌堆顶的牌' },
  { source: 'draw stack bottom', target: '置于牌堆底的牌' },
  { source: '{0} used skill {1} to you, please choose', target: '{0} 对你使用了技能 【{1}】，请选择' },
  { source: 'lose a hp', target: '失去一点体力' },
  { source: 'drop all {0} cards', target: '弃置所有 {0} 牌' },
  { source: '{0} displayed cards {1}', target: '{0} 展示了 {1}' },
  { source: '{0} displayed guhuo cards {1}', target: '{0} 展示了蛊惑牌 {1}' },
  { source: '{0} displayed cards {1} from top of draw stack', target: '{0} 展示了牌堆顶的一张 {1}' },
  { source: 'please choose another player or click cancel', target: '请选择一名其他角色或点击取消' },
  { source: '{0} reforged card {1}', target: '{0} 重铸了 {1}' },
  { source: '{0} {1} character card', target: '{0} {1} 了武将牌' },
  { source: 'rotate', target: '横置' },
  { source: 'reset', target: '重置' },
  {
    source: '{0} proposed a pindian event, please choose a hand card to pindian',
    target: '{0} 对你发起了拼点，请选择一张手牌用于拼点',
  },
  { source: '{0} used {1} to respond pindian', target: '{0} 展示了拼点牌 {1}' },
  { source: 'pindian result:{0} win', target: '拼点结果为 {0} 赢' },
  { source: 'pindian result:draw', target: '拼点结果为 平局' },
  {
    source: "please drop a {0} card, otherwise you can't do response of slash",
    target: '请弃置一张 {0} 牌，否则此杀不可被响应',
  },
  {
    source: 'please response a card to replace judge card {0} from {1}',
    target: '请打出一张手牌替换 {1} 的判定牌 {0}',
  },
  {
    source: '{0} responsed card {1} to replace judge card {2}',
    target: '{0} 打出了 {1} 替换了判定牌 {2}',
  },
  { source: '{0} starts a judge of {1}, judge card is {2}', target: '{0} 开始了 {1} 的判定，判定牌为 {2}' },
  {
    source: 'guanxing finished, {0} cards placed on the top and {1} cards placed at the bottom',
    target: '观星结束，结果为 {0} 上 {1} 下',
  },
  {
    source: '{0} used skill {1}, transformed {2} as {3} card to response',
    target: '{0} 使用了技能 【{1}】 将 {2} 当做 {3} 打出',
  },
  {
    source: '{0} used skill {1}, transformed {2} as {3} card to use',
    target: '{0} 使用了技能 【{1}】 将 {2} 当做 {3} 使用',
  },
  {
    source: '{0} used skill {1}, transformed {2} as {3} card used to {4}',
    target: '{0} 使用了技能 【{1}】 将 {2} 当做 {3} 使用，目标是 {4}',
  },
  {
    source: '{0} used card {1} to {2}',
    target: '{0} 使用了一张 {1}，目标是 {2}',
  },
  { source: '{0} equipped {1}', target: '{0} 装备了 {1}' },
  { source: '{0} is placed into drop stack', target: '{0} 置入了弃牌堆' },
  { source: '{0} responses card {1}', target: '{0} 打出了一张 {1}' },
  { source: 'please drop {0} cards', target: '请弃置 {0} 张牌' },
  { source: '{0} skipped draw stage', target: '{0} 跳过了摸牌阶段' },
  { source: '{0} skipped play stage', target: '{0} 跳过了出牌阶段' },
  { source: '{0} is dying', target: '{0} 进入了濒死阶段' },
  {
    source: '{0} asks for {1} peach',
    target: '{0} 处于濒死状态，是否对其使用 {1} 个【桃】？',
  },
  { source: '{0} was killed', target: '{0} 已阵亡，死于天灾' },
  { source: '{0} was killed by {1}', target: '{0} 已阵亡，凶手是 {1}' },
  { source: 'the role of {0} is {1}', target: '{0} 的身份是 {1}' },
  { source: '{0} recovers {1} hp', target: '{0} 恢复了 {1} 点体力' },
  {
    source: '{0} got hits from {1} by {2} {3} hp',
    target: '{0} 受到了来自 {1} 的 {2} 点【{3}】伤害',
  },
  { source: '{0} moved all hand cards out of the game', target: '{0} 将所有手牌移出了游戏' },
  { source: '{0} use skill {1}, bring {2} to hell', target: '{0} 使用了技能 {1}，杀死了 {2}' },
  {
    source: 'do you wanna use {0} for {1} from {2}',
    target: '是否对 {2} 的 {1} 使用 {0}',
  },
  {
    source: 'do you wanna use {0} for {1} from {2} to {3}',
    target: '是否对 {2} 对 {3} 使用 的 {1} 使用 {0}',
  },
  {
    source: 'do you wanna use {0} for {1}',
    target: '是否对 {1} 使用 {0}',
  },
  {
    source: 'do you wanna use {0} for {1} to {2}',
    target: '是否对目标为 {2} 的 {1} 使用 {0}',
  },
  {
    source: '{0} used {1} to you, please response a {2} card',
    target: '{0} 对你使用了 {1}, 打出一张 【{2}】 来响应',
  },
  { source: 'please response a {0} card', target: '是否打出一张 【{0}】 响应' },
  {
    source: '{0} used skill {1} to you, please response a {2} card',
    target: '{0} 对你使用了 【{1}】, 打出一张 {2} 来响应',
  },
  {
    source: 'do you wanna response a {0} card for skill {1} from {2}',
    target: '是否打出一张 【{0}】 来响应 {2} 的 【{1}】',
  },
  { source: '{0} display hand card {1} from {2}', target: '{0} 展示了 {2} 的一张 {1}' },
  { source: '{0} display hand card {1}', target: '{0} 展示了 {1}' },
  { source: '{0} lost {1} hand card', target: '{0} 失去了 {1} 张手牌' },
  { source: 'please choose', target: '请选择' },
  { source: '{0}: please choose', target: '{0}：请选择一项' },
  { source: 'please choose a player', target: '请选择一名角色' },
  { source: '{0} place card {1} from {2} on the top of draw stack', target: '{0} 将 {2} 的 {1} 置于了牌堆顶' },
  { source: 'recover {0} hp for {1}', target: '是否回复 {1} {0} 点体力' },
  { source: '{0} used skill {1}, damage increases to {2}', target: '{0} 使用了技能 【{1}】，伤害增加至 {2} 点' },
  { source: '{0} activated skill {1}, damage reduces to {2}', target: '{0} 触发了技能 【{1}】，伤害减少至 {2} 点' },
  { source: '{0} used skill {1} to you, please present a hand card', target: '{0} 使用了技能 【{1}】，请展示一张手牌' },
  { source: '{0} used {1} to you, please present a hand card', target: '{0} 对你使用了 {1}，请展示一张手牌' },
  { source: '{0} move cards {1} onto the top of character card', target: '{0} 将 {1} 置于了武将牌上' },
  { source: '{0} move {1} cards onto the top of character card', target: '{0} 将 {1} 张牌置于了武将牌上' },
  { source: '{0}: please present a hand card', target: '你成为了 {0} 的目标，请展示一张手牌' },
  { source: '{0} used skill {1}, transfrom {2} into {3}', target: '{0} 使用了技能 【{1}】，将 {2} 改为了 {3} 使用' },
  { source: '{0}: please choose a player to obtain {1}', target: '{0}：你可以将 {1} 交给一名角色' },
  { source: '{0}: please choose a player to drop', target: '{0}：你可以弃置攻击范围内含有你的一名角色区域内的一张牌' },
  {
    source: '{0} triggered skill {1}',
    target: '{0} 触发了技能 “{1}”',
  },
  {
    source: '{0} triggered skill {1}, nullify {2}',
    target: '{0} 触发了技能 “{1}”，使 {2} 对其无效',
  },
  {
    source: '{0} triggered skill {1}, become the source of damage dealed by {2}',
    target: '{0} 触发了技能 “{1}”，成为了 {2} 造成的伤害的伤害来源',
  },
  {
    source: '{0} triggered skill {1}, prevent the damage',
    target: '{0} 触发了 “{1}” 的效果，防止了此伤害',
  },
  {
    source: '{0}: please choose a card type or color',
    target: '{0}：请选择以下一种选项，系统将会亮出牌堆中符合条件的第一张牌，然后你将之交给一名男性角色',
  },
  {
    source: 'jianyan:Please choose a target to obtain the card you show',
    target: '荐言：请选择一名男性角色获得此牌',
  },
  {
    source: '{0}: do you want to use a slash to {1}?',
    target: '{0}：你可以对 {1} 使用一张【杀】（无距离限制）',
  },
  {
    source: '{0}: do you agree to pindian with {1}',
    target: '{0}：你是否同意和 {1} 进行拼点？',
  },
  {
    source: '{0}: do you want to obtain pindian cards: {1}',
    target: '{0}：你可以获得拼点牌 {1}',
  },
  {
    source: 'please drop a {0} hand card to hit {1} 1 hp of damage type fire',
    target: '请弃置一张 {0} 手牌，对 {1} 造成1点火焰伤害',
  },
  { source: 'please choose a player to get a damage from {0}', target: '请选择一名角色受到来自 {0} 的 1 点伤害' },
  {
    source: 'Obtain Basic Card, Equip Card and Duel in display cards?',
    target: '裸衣：是否放弃摸牌，然后获取展示牌中的基本牌、装备牌和【决斗】',
  },
  {
    source: '{0} used skill {1}, display cards: {2}',
    target: '{0} 使用技能 {1}，展示了：{2}',
  },
  {
    source: 'jijie:Please choose a target to obtain the card you show',
    target: '机捷：请选择一名角色获得你观看的牌',
  },
  {
    source: 'wushuang: please use extral jink',
    target: '无双：请额外使用一张 【闪】',
  },
  {
    source: 'wushuang: please use extral slash',
    target: '无双：请额外打出一张 【杀】',
  },
  {
    source: 'liyu: please choose a player, as target of {0} duel',
    target: '利驭：请选择一名角色作为 {0} 决斗的目标',
  },
  {
    source: 'please choose jiangchi options',
    target: '请选择：1.弃置一张牌，本回合【杀】无距离限制且使用次数+1 2.额外摸一张牌，本回合不可使用或打出【杀】',
  },
  {
    source: 'zhijian: do you wanna use draw 1 card',
    target: '直谏：你可以发动【直谏】摸一张牌',
  },
  {
    source: 'guzheng: do you wanna obtain the rest of cards?',
    target: '固政：是否获得剩余的牌？',
  },
  {
    source: 'tiaoxin: you are provoked by {0}, do you wanna use slash to {0}?',
    target: '{0} 对你发动了“挑衅”，是否对包括其在内的角色使用一张【杀】？',
  },
  {
    source: 'fangquan: choose 1 card and 1 player to whom you ask play one round',
    target: '放权：你可以弃置一张手牌并选择一名其他角色，该角色将于回合结束后进行一个额外回合',
  },
  {
    source: 'xiangle: please drop 1 basic card else this Slash will be of no effect to {0}',
    target: '享乐：请弃置一张基本牌，否则此【杀】将对 {0} 无效',
  },
  {
    source: '{0} sishu effect, lebusishu result will reverse',
    target: '{0} 的“思蜀”效果被触发，其将要进行的【乐不思蜀】判定效果反转',
  },
  {
    source:
      'please choose: 1. show a character from huashen area and announce a skill to obtain. 2. remove no more than two unshown characters of huashen and get equal number of that.',
    target:
      '请选择：1.从化身牌中亮出一张武将牌并声明一个技能（锁定技、主公技、限定技除外）获得之；2.移去一至二张未亮出的化身牌并获得等量的化身牌',
  },
  {
    source: 'huashen: please announce a skill to obtain',
    target: '化身：请声明一个技能获得之',
  },
  {
    source: 'wuhun:Please choose a target to die with you',
    target: '请选择一名角色进行【武魂】的判定，若结果不为【桃】或【桃园结义】，其立即死亡',
  },
  {
    source: 'qinyin: loseHp',
    target: '失去体力',
  },
  {
    source: 'qinyin: recoverHp',
    target: '回复体力',
  },
  {
    source: 'qinyin: please choose a choice to make everyone lose hp or recover hp',
    target: '琴音：你可以令全场角色依次失去 1 点体力或回复 1 点体力',
  },
  {
    source: 'yeyan: 1 point',
    target: '1 点',
  },
  {
    source: 'yeyan: 2 point',
    target: '2 点',
  },
  {
    source: 'yeyan: 3 point',
    target: '3 点',
  },
  {
    source: 'yeyan: cancel',
    target: '取消',
  },
  {
    source: 'please assign damage for {0}',
    target: '请为 {0} 分配伤害点数',
  },
  {
    source: 'please assign damage for {0}, {1}',
    target: '请为 {0}、{1} 分配伤害点数',
  },
  {
    source: 'please assign damage for {0}, {1}, {2}',
    target: '请为 {0}、{1}、{2} 分配伤害点数',
  },
  {
    source: 'please assign x damage for {0}, and {1} will get (3 - x) damage',
    target: '请为 {0} 分配 x 点伤害，{1} 将会分配到 (3 - x) 点伤害',
  },
  { source: 'please choose {0} handcards and give them to a target', target: '请选择 {0} 张手牌交给一名其他角色' },
  {
    source: '{0} used skill {1}, swapped {2} handcards from qixing cards pile',
    target: '{0} 使用了技能 【{1}】，从七星堆交换了 {2} 张牌',
  },
  {
    source: 'dawu: card to drop',
    target: '弃牌区',
  },
  {
    source: 'Please choose {0} player to set {1} mark',
    target: '请选择 {0} 名角色，其获得‘{1}’标记',
  },
  {
    source: '{0} used skill {1}, nullified damage event',
    target: '{0} 使用了技能 【{1}】，防止了此次伤害',
  },
  {
    source: 'cuike: do you wanna to throw {0} marks to do special skill',
    target: '摧克：你可以弃 {0} 枚“军略”对其他角色各造成1点伤害',
  },
  {
    source: 'zhanhuo: please choose a target to whom you cause 1 fire damage',
    target: '绽火：请选择一名角色对其造成1点火焰伤害',
  },
  {
    source: 'wumou: loseHp',
    target: '失去体力',
  },
  {
    source: 'wumou: loseMark',
    target: '失去标记',
  },
  {
    source: 'wumou: please choose the cost for your Normal Trick',
    target: '请选择：失去 1 点体力或失去 1 枚‘狂暴’标记',
  },
  {
    source: 'shenfen: please select 4 cards to drop',
    target: '神愤：请弃置 4 张手牌',
  },
  { source: '{0} obtained character cards {1}', target: '{0} 获得了武将 {1}' },
  { source: '{0} swapped {1} character cards', target: '{0} 交换了 {1} 张武将牌' },
  { source: 'huashen skill:{0}', target: '化身: {0}' },

  { source: 'cixiongjian:drop-card', target: '弃置一张手牌' },
  { source: 'cixiongjian:draw-card', target: '令其摸一张牌' },
  { source: 'jizhi:discard', target: '弃置' },
  { source: 'jizhi:keep', target: '保留' },
  { source: 'do you wanna discard {0}', target: '是否弃置 {0} 增加一手牌上限' },
  { source: 'please choose a basic card to use', target: '请选择一张基本卡使用' },
  { source: 'jieyin:drop', target: '弃置此牌' },
  { source: 'jieyin:move', target: '置于其装备区' },
  { source: 'gongxin:putcard', target: '置于牌堆顶' },
  { source: 'gongxin:dropcard', target: '弃置此牌' },
  { source: 'yijue:recover', target: '令其回复一点体力' },
  { source: 'yijue:cancel', target: '取消' },
  { source: 'yaowu:recover', target: '回复1点体力' },
  { source: 'yaowu:draw', target: '摸一张牌' },
  { source: 'luoyi:obtain', target: '是' },
  { source: 'luoyi:cancel', target: '否' },
  { source: 'jiangchi:draw', target: '摸一张牌' },
  { source: 'jiangchi:drop', target: '弃一张牌' },
  { source: 'kuanggu:draw', target: '摸一张牌' },
  { source: 'kuanggu:recover', target: '回复1点体力' },
  { source: 'guhuo:doubt', target: '质疑' },
  { source: 'guhuo:no-doubt', target: '不质疑' },
  { source: 'do you doubt the pre-use of {0} from {1}', target: '是否质疑 {1} 使用的 {0}' },
  { source: '{0} selected {1}', target: '{0} 选择了 {1}' },
  { source: 'guhuo:lose-hp', target: '失去一点体力' },
  { source: 'guhuo:drop-card', target: '弃置一张牌' },
  { source: 'jianyan:red', target: '红色牌' },
  { source: 'jianyan:black', target: '黑色牌' },
  { source: 'zhiji:drawcards', target: '摸两张牌' },
  { source: 'zhiji:recover', target: '回复1点体力' },
  { source: 'please choose the amount of hp to lose', target: '请选择要失去的体力值' },
  { source: 'please choose your zhiheng cards', target: '请选择要制衡的牌' },
  {
    source: 'please choose tianxiang options',
    target: '请选择：1.令其受到1点伤害，然后摸X张牌（X为你其失去的体力值）。2.令其失去1点体力，然后其获得你弃置的牌',
  },
  { source: 'do you wanna transfer the card {0} target to {1}', target: '是否将【{0}】的使用目标改为【{1}】' },
  {
    source: 'please choose fangzhu options:{0}',
    target: '请选择：1.摸{0}张牌并翻面；2.弃置{0}张牌并失去1点体力',
  },
  {
    source: 'please choose yinghun options:{0}:{1}',
    target: '请选择：1.令 {0} 摸一张牌，然后弃置 {1} 张牌；2.令 {0} 摸 {1} 张牌，然后弃置一张牌',
  },
  {
    source: 'player {0} join in the room',
    target: '玩家 {0} 进入了房间',
  },
  {
    source: 'player {0} has left the room',
    target: '玩家 {0} 退出了房间',
  },
  {
    source: 'game will start within 3 seconds',
    target: '游戏将在3秒后开始',
  },
];

export const UiDictionary: Word[] = [
  { source: 'No rooms at the moment', target: '还没有玩家创建房间' },
  { source: 'Create a room', target: '创建房间' },
  { source: 'waiting', target: '等待中' },
  { source: 'playing', target: '游戏中' },
  { source: "{0}'s room", target: '{0} 的房间' },
  { source: 'please enter your room name', target: '房间名' },
  { source: 'please choose number of players', target: '选择玩家数' },
  { source: '{0} players', target: '{0} 个玩家' },
  { source: 'please enter your username', target: '玩家名称' },
  {
    source: 'Unmatched core version, please update your application',
    target: '内核版本不匹配，请升级你的客户端版本',
  },
  { source: 'Refresh room list', target: '刷新房间' },
  { source: 'Change username', target: '更改玩家名' },
  { source: 'Join', target: '加入' },
  { source: 'lobby', target: '大厅' },
  { source: 'room id', target: '房间号' },
  { source: 'round {0}', target: '第 {0} 轮' },
  { source: '{0} draw cards left', target: '剩余 {0} 牌' },
  { source: 'please enter your text here', target: '在此输入聊天内容' },
  { source: 'send', target: '发送' },
  { source: '{0} {1} says: {2}', target: '{0} {1} 说：{2}' },
  { source: 'player name', target: '玩家名' },
  { source: 'character name', target: '武将' },
  { source: 'role', target: '身份' },
  { source: 'status', target: '状态' },
  { source: 'handcards', target: '手牌' },
  { source: 'check', target: '查看' },
  { source: 'offline', target: '离线' },
  { source: 'trusted', target: '托管' },
  { source: 'cancel trusted', target: '取消托管' },
  { source: 'in trusted', target: '托管中···' },
  {
    source: 'New QSanguosha',
    target: '新神杀',
  },
  {
    source: 'confirm',
    target: '确定',
  },
  {
    source: 'reforge',
    target: '重铸',
  },
  {
    source: 'cancel',
    target: '取消',
  },
  {
    source: 'finish',
    target: '结束',
  },
  { source: 'main volume', target: '音乐音量' },
  { source: 'game volume', target: '游戏音量' },
  { source: 'settings', target: '设置' },
];
