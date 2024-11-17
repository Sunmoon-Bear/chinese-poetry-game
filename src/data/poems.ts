import { Poem } from '../types/poem';

export const poems: Poem[] = [
  {
    id: 100,
    title: "静夜思",
    author: "李白",
    dynasty: "tang",
    content: "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
    difficulty: 1
  },
  {
    id: 101,
    title: "春晓",
    author: "孟浩然",
    dynasty: "tang",
    content: "春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。",
    difficulty: 1
  },
  {
    id: 102,
    title: "登鹳雀楼",
    author: "王之涣",
    dynasty: "tang",
    content: "白日依山尽，黄河入海流。欲穷千里目，更上一层楼。",
    difficulty: 1
  },
  {
    id: 103,
    title: "咏鹅",
    author: "骆宾王",
    dynasty: "tang",
    content: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。",
    difficulty: 1
  },
  {
    id: 104,
    title: "悯农",
    author: "李绅",
    dynasty: "tang",
    content: "锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦。",
    difficulty: 1
  },
  {
    id: 150,
    title: "赋得古原草送别",
    author: "白居易",
    dynasty: "tang",
    content: "离离原上草，一岁一枯荣。野火烧不尽，春风吹又生。",
    difficulty: 2
  },
  {
    id: 151,
    title: "山行",
    author: "杜牧",
    dynasty: "tang",
    content: "远上寒山石径斜，白云生处有人家。停车坐爱枫林晚，霜叶红于二月花。",
    difficulty: 2
  },
  {
    id: 152,
    title: "游子吟",
    author: "孟郊",
    dynasty: "tang",
    content: "慈母手中线，游子身上衣。临行密密缝，意恐迟迟归。谁言寸草心，报得三春晖。",
    difficulty: 2
  },
  {
    id: 154,
    title: "送杜少府之任蜀州",
    author: "王勃",
    dynasty: "tang",
    content: "城阙辅三秦，风烟望五津。与君离别意，同是宦游人。海内存知己，天涯若比邻。无为在歧路，儿女共沾巾。",
    difficulty: 2
  },
  {
    id: 155,
    title: "早发白帝城",
    author: "李白",
    dynasty: "tang",
    content: "朝辞白帝彩云间，千里江陵一日还。两岸猿声啼不住，轻舟已过万重山。",
    difficulty: 2
  },
  {
    id: 156,
    title: "望天门山",
    author: "李白",
    dynasty: "tang",
    content: "天门中断楚江开，碧水东流至此回。两岸青山相对出，孤帆一片日边来。",
    difficulty: 2
  },
  {
    id: 180,
    title: "登高",
    author: "杜甫",
    dynasty: "tang",
    content: "风急天高猿啸哀，渚清沙白鸟飞回。无边落木萧萧下，不尽长江滚滚来。万里悲秋常作客，百年多病独登台。艰难苦恨繁霜鬓，潦倒新停浊酒杯。",
    difficulty: 3
  },
  {
    id: 181,
    title: "蜀相",
    author: "杜甫",
    dynasty: "tang",
    content: "丞相祠堂何处寻，锦官城外柏森森。映阶碧草自春色，隔叶黄鹂空好音。三顾频烦天下计，两朝开济老臣心。出师未捷身先死，长使英雄泪满襟。",
    difficulty: 3
  },
  {
    id: 200,
    title: "春日",
    author: "朱熹",
    dynasty: "song",
    content: "胜日寻芳泗水滨，无边光景一时新。等闲识得东风面，万紫千红总是春。",
    difficulty: 1
  },
  {
    id: 201,
    title: "观书有感",
    author: "朱熹",
    dynasty: "song",
    content: "半亩方塘一鉴开，天光云影共徘徊。问渠那得清如许，为有源头活水来。",
    difficulty: 1
  },
  {
    id: 202,
    title: "题西林壁",
    author: "苏轼",
    dynasty: "song",
    content: "横看成岭侧成峰，远近高低各不同。不识庐山真面目，只缘身在此山中。",
    difficulty: 1
  },
  {
    id: 250,
    title: "江城子·密州出猎",
    author: "苏轼",
    dynasty: "song",
    content: "老夫聊发少年狂，左牵黄，右擎苍。锦帽貂裘，千骑卷平冈。为报倾城随太守，亲射虎，看孙郎。",
    difficulty: 2
  },
  {
    id: 252,
    title: "浣溪沙·一曲新词酒一杯",
    author: "晏殊",
    dynasty: "song",
    content: "一曲新词酒一杯，去年天气旧亭台。夕阳西下几时回。无可奈何花落去，似曾相识燕归来。小园香径独徘徊。",
    difficulty: 2
  },
  {
    id: 253,
    title: "蝶恋花·春景",
    author: "苏轼",
    dynasty: "song",
    content: "花褪残红青杏小，燕子飞时，绿水人家绕。枝上柳绵吹又少，天涯何处无芳草。墙里秋千墙外道，墙外行人，墙里佳人笑。笑渐不闻声渐悄，多情却被无情恼。",
    difficulty: 2
  },
  {
    id: 254,
    title: "临江仙·夜饮东坡醒复醉",
    author: "苏轼",
    dynasty: "song",
    content: "夜饮东坡醒复醉，归来仿佛三更。家童鼻息已雷鸣。敲门都不应，倚杖听江声。长恨此身非我有，何时忘却营营。夜阑风静縠纹平。小舟从此逝，江海寄余生。",
    difficulty: 2
  },
  {
    id: 280,
    title: "定风波",
    author: "苏轼",
    dynasty: "song",
    content: "莫听穿林打叶声，何妨吟啸且徐行。竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。料峭春风吹酒醒，微冷，山头斜照却相迎。回首向来萧瑟处，归去，也无风雨也无晴。",
    difficulty: 3
  },
  {
    id: 281,
    title: "念奴娇·赤壁怀古",
    author: "苏轼",
    dynasty: "song",
    content: "大江东去，浪淘尽，千古风流人物。故垒西边，人道是，三国周郎赤壁。乱石穿空，惊涛拍岸，卷起千堆雪。江山如画，一时多少豪杰。",
    difficulty: 3
  },
  {
    id: 282,
    title: "水调歌头",
    author: "苏轼",
    dynasty: "song",
    content: "明月几时有，把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。",
    difficulty: 3
  }
];