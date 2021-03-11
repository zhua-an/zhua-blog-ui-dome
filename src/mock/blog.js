import Mock from 'mockjs'


export default ({ mock }) => {
    if (!mock) return;
    Mock.mock('/blog/fetchBlogLinks', 'get', () => {
        return {
            data: [{
				id: 'home',
				linkName: '首页',
				icon: 'icon-shouye',
				path: '/home',
				children: []
			},{
				id: 'hirofumi',
				linkName: '博文',
				icon: 'icon-book',
				path: '/hirofumi'
			},{
				id: 'bellesLettres',
				linkName: '美文',
				icon: 'icon-meiwen',
				path: '/bellesLettres'
			},{
				id: 'heartFeelings',
				linkName: '心语',
				icon: 'icon-riji2',
				path: '/heartFeelings'
			},{
				id: 'message',
				linkName: '留言',
				icon: 'icon-liuyan1',
				path: '/message'
			},{
				id: 'friendsLink',
				linkName: '友链',
				icon: 'icon-lianjie',
				path: '/friendsLink'
			},{
				id: 'update',
				linkName: '更新',
				icon: 'icon-renewal',
				path: '/update'
			},{
				id: 'about',
				linkName: '关于',
				icon: 'icon-guanyu',
				path: '/about',
				children: [{
					id: 'aboutSite',
					linkName: '关于本站',
					path: '/about'
				},{
					id: 'aboutBlogger',
					linkName: '关于博主',
					path: '/author'
				}]
			}]
        }
	})


	Mock.mock('/blog/fetchBlogger', 'get', () => {
        return {
            data: {
				id: 1,
				name: 'zhua',
                address: '山东省青岛市',
                qq: '342961677',
                email: 'zhua_an@163.com'
            }
        }
    })

	//访问量+1
	Mock.mock('/blog/website/addVisit', 'post', () => {
        return {
            code: 0,
			data: null,
			msg: null,
        }
	})

	//获取热门文章
	Mock.mock(RegExp(/\/blog\/article\/fetchHotArticle\?size=*/), 'get', () => {
        return {
            code: 0,
			data: [
				{"date":"2020-02-15 01:44:00","del_flag":"0","like_num":2,"visit_count":67,"create_time":"2020-02-15 01:44:00","title":"愿时光不老，你我安好，足矣！","type":"2","tags":"","update_time":"2020-02-15 01:45:09","cover_src":"https://yssimage.oss-cn-hangzhou.aliyuncs.com/11.jpg","id":3,"href":"","introduction":"多想把时光握在手心里，边走边欣赏这世界的温婉与繁华。不必担心时光匆匆，不用害怕岁月会老，只愿在慢下来的光阴里，做好自己想做的事，许一场地久天长，许一世岁月静好。"},
				{"date":"2020-02-19 14:09:53","del_flag":"0","like_num":1,"visit_count":81,"create_time":"2020-02-19 14:09:53","title":"RestTemplate 用法详解","type":"1","tags":"RestTemplate","update_time":"2020-02-20 01:43:28","cover_src":"https://www.zhua91.com/zhua-oss/article/e9c4dba5389e4f11bf0af74b34f052af","id":4,"href":"","introduction":"RestTemplate是Spring提供的用于访问Rest服务的客户端，RestTemplate提供了多种便捷访问远程Http服务的方法,能够大大提高客户端的编写效率。"},
				{"date":"2020-02-06 04:15:36","del_flag":"0","like_num":0,"visit_count":113,"create_time":"2020-02-06 04:15:36","title":"愿山河无恙，人间皆安","type":"2","tags":"春天","update_time":"2020-02-19 14:56:40","cover_src":"https://www.zhua91.com/zhua-oss/article/c654d1b765544f759ae84407d9404bdc","id":1,"href":"","introduction":"这个冬季，格外的寒冷，  这个新年，异常的难熬。  好在时间..."},
				{"date":"2020-02-06 08:29:09","del_flag":"0","like_num":0,"visit_count":48,"create_time":"2020-02-06 08:29:09","title":"docker swarm 入门","type":"1","tags":"docker,docker swarm","update_time":"2020-10-15 10:16:31","cover_src":"https://www.zhua91.com/zhua-oss/article/1441e7c418be424090a0c727eab2d3ba","id":2,"href":"","introduction":"docker swarm是docker官方提供的一套容器编排系统。"},
				{"date":"2020-09-10 08:04:34","del_flag":"0","like_num":0,"visit_count":20,"create_time":"2020-09-10 08:04:34","title":"Centos7下安装ELK日志中心","type":"1","tags":"ELK","update_time":"2020-09-18 03:48:39","cover_src":"","id":38,"href":"","introduction":"ELK是日志分析平台，不是一款软件,而是一整套解决方案,是三个软件产品的首字母缩写，ELK分别代表： Elasticsearch:负责日志检索和储存 （ELK的核心） Logstash:负责日志的收集和分析、处理 Kibana:负责日志的可视化"},
				{"date":"2020-02-22 06:05:39","del_flag":"0","like_num":0,"visit_count":18,"create_time":"2020-02-22 06:05:39","title":"Navicat连接MySQL8.0报错1251问题","type":"1","tags":"Mysql8,Navicat","update_time":"2020-02-22 06:11:12","cover_src":"https://www.zhua91.com/zhua-oss/article/0786ea3a429646568f8c2dd3c8700fcf","id":6,"href":"","introduction":"在MySQL 8.0.以上版本中，caching_sha2_password是默认的身份验证插件，而不是以往的mysql_native_password。"}
			],
			msg: null
        }
	})

	//每日物语
	Mock.mock('/blog/dailySay/page?current=1&size=1', 'get', () => {
        return {
            code: 0,
			data: {
				records: [{
					content: "<p>没有很高的情商<br>没有圆滑的处世<br>遇到挫折就会抱怨<br>可我待人真诚 明辨是非<br>懂得感恩 问心无愧&nbsp;</p><p>&nbsp;<br></p><p><a target=\"_blank\" render=\"ext\" suda-uatrack=\"key=topic_click&amp;value=click_topic\" extra-data=\"type=topic\" href=\"https://s.weibo.com/weibo?q=%23%E6%84%BF%E4%BD%A0%E9%81%87%E5%88%B0%E7%9A%84%E4%BA%BA%E9%83%BD%E6%98%AF%E6%B8%A9%E6%9A%96%E7%9A%84%23&amp;from=default\">#愿你遇到的人都是温暖的#</a>&nbsp;&nbsp;&nbsp;&nbsp;<br></p>"
				}]
			},
			msg: null
        }
	})

	//首页留言
	Mock.mock('/blog/comment/page?current=1&size=20&type=4', 'get', () => {
        return {
            code: 0,
			data: {
				records: [
					{"id":4,"parentId":null,"commentatorId":3,"commentator":"づ子华ヾ","commentatorAvatar":"http://thirdqq.qlogo.cn/g?b=oidb&k=42v8aMwPNICDicB7Pzv3Uhw&s=100&t=1556397484","responderId":null,"responder":null,"responderAvatar":null,"content":"打卡","time":"2020-02-29 19:41:11","address":null,"browser":"Chrome/78.0.3904.108","ip":"122.4.67.185","type":"4","objectId":null,"createTime":"2020-02-29 19:41:11","delFlag":"0"},
					{"id":1,"parentId":null,"commentatorId":3,"commentator":"づ子华ヾ","commentatorAvatar":"http://thirdqq.qlogo.cn/g?b=oidb&k=42v8aMwPNICDicB7Pzv3Uhw&s=100&t=1556397484","responderId":null,"responder":null,"responderAvatar":null,"content":"沙发:bowtie:","time":"2020-02-21 20:21:19","address":"山东","browser":"Chrome/78.0.3904.108","ip":"122.4.67.185","type":"4","objectId":null,"createTime":"2020-02-21 20:21:19","delFlag":"0"},
					{"id":12,"parentId":null,"commentatorId":10,"commentator":"Zhua1101","commentatorAvatar":"https://tva3.sinaimg.cn/crop.0.0.180.180.50/9b95c19ejw1e8qgp5bmzyj2050050aa8.jpg?KID=imgbed,tva&Expires=1583822234&ssig=QslHZQMYDT","responderId":null,"responder":null,"responderAvatar":null,"content":"微博打卡:grin:","time":"2020-03-10 11:37:42","address":null,"browser":"Chrome/78.0.3904.108","ip":"122.4.67.185","type":"4","objectId":null,"createTime":"2020-03-10 11:37:42","delFlag":"0"}
				]
			},
			msg: null
        }
	})

	//访客
	Mock.mock(/\/social\/socialUser\/getVisitor\?current=1&size=*/, 'get', () => {
        return {
			code: 0,
			data: {
				records: [{
					nickName: '潘多拉',
					userName: '潘多拉',
					avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
				},{
					nickName: '潘多拉',
					userName: '潘多拉',
					avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
				},{
					nickName: '潘多拉',
					userName: '潘多拉',
					avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
				}]
			},
			msg: null
        }
	})

	//首页统计
    Mock.mock('/blog/statistics/fetchBlogStatistics', 'get', () => {
        return {
			code: 0,
            data: {
                likeCount: 1024,
                commentCount: 521,
                visitCount: 13526,
                workingDay: 128
            }
        }
	})

	//版本更新记录
	Mock.mock(/blog\/version\/page\?current=\d&size=10/, 'get', () => {
		return {
			code: 0,
			data: {
				current: 1,
				pages: 1,
				records: [
					{"id":9,"content":"<p>新增博文置顶功能</p><p>其他小优化</p>","version":"1.2.2","time":"2020-10-15 18:15:29","createTime":"2020-10-15 18:15:31"},
					{"id":8,"content":"<p>优化评论组件</p>","version":"1.2.1","time":"2020-09-25 18:00:00","createTime":"2020-09-25 17:46:10"},
					{"id":7,"content":"<ol><li>新增资源分享</li><li>更改标签样式</li><li>其他小优化</li></ol>","version":"1.2.0","time":"2020-04-11 11:59:40","createTime":"2020-04-11 11:59:43"},
					{"id":6,"content":"<p>加入百度统计</p>","version":"1.1.1","time":"2020-02-28 11:57:21","createTime":"2020-02-28 11:57:34"},
					{"id":5,"content":"<p>增加了QQ互联，赶快登录试试吧。</p>","version":"1.1.0","time":"2020-02-19 00:00:00","createTime":"2020-02-19 15:49:29"},
					{"id":4,"content":"<p>Zhua 个人博客正式上线了...</p><p></p><ol><li>博文：记录学习</li><li>美文：美文共享</li><li>心语：一句话精彩语录</li></ol><p></p>","version":"1.0.0","time":"2020-02-06 00:00:00","createTime":"2020-02-12 13:45:55"}
				],
				size: 10,
				total: 6
			}
		}
	})
	
	//友链
	Mock.mock('/blog/friendsLink/fetchData', 'get', () => {
		return {
			data: [{
				createTime: "2020-02-12 13:05:46",
				delFlag: "0",
				favicon: "https://www.zhua91.com/favicon.ico",
				id: 2,
				introduction: "斯人若彩虹，遇上方知有",
				link: "https://www.zhua91.com",
				name: "Zhua 个人博客",
				userId: null,
				validFlag: "0",
				validTime: null
			}]
		}
	})

	//美文 type: 1 博文，2  美文
	Mock.mock(/\/blog\/article\/fetchData\?type=/, 'get', (option) => {
		//美文
		// return {
		// 	code: 0,
		// 	data: {
		// 		current: 1,
		// 		records: [
		// 			{"date":"2020-09-22","comment_count":0,"del_flag":"0","visit_count":6,"like_count":0,"create_time":"2020-09-22 01:06:51","year":"2020","title":"若你回眸，秋风十里","type":"2","tags":"","update_time":"2020-09-22 01:06:51","top_flag":"0","month":"09","cover_src":"https://www.zhua91.com/zhua-oss/article/13811900755a4dc2b95f34e64d5919ee","id":40,"href":"","time":"09:06","day":"22","introduction":"岁月，依旧如水静静流淌。翻过的日历，寂静，安然，落满花开花落的香。深秋，却是一笺落雨的清词，少了一份浮躁，多了一份厚重。"},
		// 			{"date":"2020-09-16","comment_count":0,"del_flag":"0","visit_count":4,"like_count":0,"create_time":"2020-09-16 03:46:06","year":"2020","title":"路过秋天，路过你","type":"2","tags":"","update_time":"2020-09-16 03:46:06","top_flag":"0","month":"09","cover_src":"https://www.zhua91.com/zhua-oss/article/63f821215acf4105b9b5ae9d90afa194","id":39,"href":"","time":"11:46","day":"16","introduction":"搭一座桥，去你心里瞧一瞧，一个人的世界，是否有万家灯火的明亮，是否像你说的那样喧闹。我只想知道，你的那一扇窗、一盏灯光，为谁在每个夜里点亮。"},
		// 			{"date":"2020-07-16","comment_count":0,"del_flag":"0","visit_count":3,"like_count":0,"create_time":"2020-07-16 05:52:56","year":"2020","title":"一朝一夕一瞬间，一来一去一人生","type":"2","tags":"","update_time":"2020-07-16 05:52:56","top_flag":"0","month":"07","cover_src":"https://www.zhua91.com/zhua-oss/article/c9f4569667b749c5841c4cf90afebc3a","id":34,"href":"","time":"13:52","day":"16","introduction":"人生匆匆，聚散无常，这世间没有永恒的美丽，只有活在当下的美好。"},
		// 			{"date":"2020-04-03","comment_count":0,"del_flag":"0","visit_count":6,"like_count":0,"create_time":"2020-04-03 06:46:38","year":"2020","title":"心若释然，岁月花开","type":"2","tags":"","update_time":"2020-04-03 06:47:02","top_flag":"0","month":"04","cover_src":"https://www.zhua91.com/zhua-oss/article/07fd7a0b59c4409c90145096061c1c0a","id":18,"href":"","time":"14:46","day":"03","introduction":"心若释然，岁月花开，只有在心中修篱种菊，怡养内在的优雅与高贵，才能顿悟一生，释然所有。"},
		// 			{"date":"2020-03-19","comment_count":0,"del_flag":"0","visit_count":5,"like_count":0,"create_time":"2020-03-19 06:02:49","year":"2020","title":"时光的渡口，等一场春暖花开","type":"2","tags":"","update_time":"2020-03-19 06:02:49","top_flag":"0","month":"03","cover_src":"https://www.zhua91.com/zhua-oss/article/7531fb1c71bd4e829b214f77a25fc36e","id":17,"href":"","time":"14:02","day":"19","introduction":"青春不曾谢幕，岁月还在流转，我站在时光的渡口，等一场春暖花开。"},
		// 			{"date":"2020-03-11","comment_count":0,"del_flag":"0","visit_count":6,"like_count":0,"create_time":"2020-03-11 00:38:44","year":"2020","title":"风有约，花不误，岁岁如此，永不相负","type":"2","tags":"","update_time":"2020-03-11 00:38:44","top_flag":"0","month":"03","cover_src":"https://www.zhua91.com/zhua-oss/article/a9ca98dcc1b14a5d9498cfc5e25c6e5c","id":15,"href":"","time":"08:38","day":"11","introduction":"风有约，花不误，岁岁如此，永不相负"}
		// 		],
		// 		size: 10,
		// 		total: 37
		// 	}
		// }
		//博文
		return {
			code: 0,
			data: {
				"total":37,
				"current":1,
				"size":10,
				"records":[
					{"date":"2020-02-06","comment_count":0,"del_flag":"0","visit_count":49,"like_count":0,"create_time":"2020-02-06 16:29:09","year":"2020","title":"docker swarm 入门","type":"1","tags":"docker,docker swarm","update_time":"2020-10-15 18:16:31","top_flag":"1","month":"02","cover_src":"https://www.zhua91.com/zhua-oss/article/1441e7c418be424090a0c727eab2d3ba","id":2,"href":"","time":"16:29","day":"06","introduction":"docker swarm是docker官方提供的一套容器编排系统。"},
					{"date":"2021-02-24","comment_count":0,"del_flag":"0","visit_count":3,"like_count":1,"create_time":"2021-02-24 09:19:46","year":"2021","title":"使用docker jenkins 一键打包部署博客后台","type":"1","tags":"Docker,Jenkins","update_time":"2021-02-24 08:55:11","top_flag":"0","month":"02","cover_src":"https://www.zhua91.com/zhua-oss/article/b9f9dad96f34422d44b870f788ba392a.png_d1e27782bc7645f389061cacf3cd56cf","id":50,"href":"","time":"09:19","day":"24","introduction":"Jenkins是一个开源的、提供友好操作界面的持续集成(CI)工具，起源于Hudson（Hudson是商用的），主要用于持续、自动的构建/测试软件项目、监控外部任务的运行（这个比较抽象，暂且写上，不做解释）。  作者：哥本哈根月光 链接：https://www.jianshu.com/p/5f671aca2b5a 来源：简书 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。"},
					{"date":"2020-12-31","comment_count":0,"del_flag":"0","visit_count":2,"like_count":0,"create_time":"2020-12-31 17:00:20","year":"2020","title":"Activiti6（五）Activiti API说明","type":"1","tags":"Activiti6","update_time":"2020-12-31 17:24:28","top_flag":"0","month":"12","cover_src":"","id":49,"href":"","time":"17:00","day":"31","introduction":"Activiti Api 设计的非常友好，使用的过程中也是学习到了api设计的一些技巧，有时间也会整理下，Service负责执行动作，Query负责执行查询，也就是涉及到数据的增、删、改由Service负责，涉及到数据的查由Query负责，在spring boot中，Service可以通过注入获取，Query可以通过相应的Service获取，所有的Service都可以通过ProcessEngine获取。"}
				]}
		}
	})

	//心語
	Mock.mock(/\/blog\/dailySay\/fetchSayPage\?current=\d&size=10/, 'get', () => {
		return {
			code: 0,
			data: {
				current: 1,
				records: [
					{"id":24,"userId":null,"content":"<p>往事归零，爱恨随意，<br>敬你一杯酒，从此朝前走。<br>往事不回头，未来不将就。 &nbsp;&nbsp;&nbsp;<br></p>","address":"","delFlag":"0","createTime":"2020-02-17 17:54:20","date":"2020-02-17 17:54","imgSrc":"https://www.zhua91.com/zhua-oss/heart-feelings/3a647f66915942a4ad84c9bcf37db706","likeCount":0,"commentVal":null,"commentCount":0,"commentList":[],"size":10,"current":1,"imgSrcList":[]},
					{"id":23,"userId":null,"content":"<p>生活给你的很多难堪，</p><p>不是在跟你过不去，</p><p>而是要你不断提高生存的技能。&nbsp;&nbsp;<br></p>","address":"","delFlag":"0","createTime":"2020-02-12 21:25:38","date":"2020-02-12 21:25","imgSrc":"https://www.zhua91.com/zhua-oss/heart-feelings/5f48068ca7d04e6abcb1afd62216e91d","likeCount":0,"commentVal":null,"commentCount":0,"commentList":[],"size":10,"current":1,"imgSrcList":[]},
					{"id":3,"userId":null,"content":"<p>世上最好的缘，便是有个聊得来的伴，</p><p>永远不嫌你的话多，不厌其烦且久处不厌，</p><p>永远会陪在身边，念你冷暖，且懂你悲欢。&nbsp;&nbsp;&nbsp;<br></p>","address":"","delFlag":"0","createTime":"2020-02-10 21:02:05","date":"2020-02-10 21:02","imgSrc":"https://www.zhua91.com/zhua-oss/heart-feelings/2eace5aee4b04e0ab8fbfb8fcf34a333","likeCount":0,"commentVal":null,"commentCount":0,"commentList":[],"size":10,"current":1,"imgSrcList":[]},
					{"id":2,"userId":null,"content":"<p>人一无所有的时候最清醒，渐渐的知道了，很多东西可遇而不可求，不属于自己的，何必拼了命去在乎。你在意什么，什么就会折磨你。\"期待\"是所有心痛的根源。 有些东西，得之我幸，失之我命，当看破一切的时候，才明白原来失去比拥有更踏实。 &nbsp;&nbsp;<br></p>","address":"","delFlag":"0","createTime":"2020-02-07 20:55:36","date":"2020-02-07 20:55","imgSrc":"https://www.zhua91.com/zhua-oss/heart-feelings/12919c1631c24addb38b89d2ad4e3856","likeCount":2,"commentVal":null,"commentCount":0,"commentList":[],"size":10,"current":1,"imgSrcList":[]},
					{"id":1,"userId":null,"content":"<p>斯人若彩虹，遇上方知有&nbsp;<br></p>","address":"羊城 —— 一个不产羊的城市","delFlag":"0","createTime":"2020-02-06 07:19:51","date":"2020-02-06 07:19","imgSrc":null,"likeCount":2,"commentVal":null,"commentCount":0,"commentList":[],"size":10,"current":1,"imgSrcList":[]}
				],
				size: 10,
				total: 25
			}
		}
	})

	//加载留言
	//博文留言 &objectId=文章id
	Mock.mock(/\/blog\/comment\/fetchComments\?current=\d&size=10&type=\d/, 'get', () => {
        return {
			code: 0,
            data: {
				current: 1,
				records:[{
					id: 1,
					commentatorId: 1,
					commentator: '潘多拉',
					commentatorAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
					responderId: null,
					responder: '',
					type: '1',
					content: 'Hello World!',
					time: '2019-07-27 17:44:21',
					address: '西虹市 移通',
					browser: 'Chrome 75.0',
					children: [
						{
							id: 2,
							commentatorId: 2,
							commentator: 'Lonely',
							responderAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
							responderId: 1,
							responder: '潘多拉',
							type: '1',
							content: 'Hello !!!',
							time: '2019-07-28 17:44:21',
							address: '西虹市 移通',
							browser: 'Chrome 75.0',
							parentId: 1
						},{
							id: 3,
							commentatorId: 1,
							commentator: '潘多拉',
							responderAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
							responderId: 2,
							responder: 'Lonely',
							type: '1',
							content: 'Hi !!!',
							time: '2019-07-28 17:50:21',
							address: '西虹市 移通',
							browser: 'Chrome 75.0',
							parentId: 1
						}
					]
				},{
					id: 4,
					commentatorId: 1,
					commentator: '潘多拉',
					commentatorAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
					responderId: null,
					responder: '',
					type: '1',
					content: '你好!',
					time: '2019-07-27 17:44:21',
					address: '西虹市 移通',
					browser: 'Chrome 75.0'
				}]
			}
        }
	})

	//留言
	// type: 1：博文，2：美文，3：心语, 4：留言
	Mock.mock(/\/blog\/comment/, 'put', () => {
		//留言板留言
		return {
			code: 0,
			data: {
				id: 5,
				commentatorId: 10,
				commentator: 'Zhua-er',
				commentatorAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
				responderId: null,
				responder: '',
				responderAvatar:null,
				type: '4',
				content: '2021 新年好!:sunrise_over_mountains:',
				time: '2019-07-27 17:44:21',
				address: '西虹市 移通',
				browser: 'Chrome 75.0'
			}
		}

		//留言板回复留言
		// return {
		// 	code: 0,
		// 	data: {
		// 		address: null,
		// 		browser: "Chrome/84.0.4147.89",
		// 		commentator: "潘多拉",
		// 		commentatorAvatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
		// 		commentatorId: 1,
		// 		content: "12",
		// 		createTime: "2021-02-28 15:58:58",
		// 		delFlag: "0",
		// 		id: 72,
		// 		ip: "127.0.0.1",
		// 		objectId: null,
		// 		parentId: 71,
		// 		responder: "づ子华ヾ",
		// 		responderAvatar: "http://thirdqq.qlogo.cn/g?b=oidb&k=42v8aMwPNICDicB7Pzv3Uhw&s=100&t=1556397484",
		// 		responderId: 3,
		// 		time: "2021-02-28 15:58:58",
		// 		type: "4"
		// 	}
		// }
	})

	//点赞
	// type: 1：博文，2：美文，3：心语, 4：留言
	Mock.mock(/\/blog\/like/, 'post', () => {
		//留言板留言
		return {
			code: 0,
			data: 1    // 1: 点赞，0：取消点赞
		}
	})

	//资源分类
	Mock.mock('/blog/dict/type/res_type', 'get', () => {
		//VUE 插件 、Jquery 插件
		return {
			code: 0,
			data: [
				{"id":7,"value":"1","label":"VUE插件","type":"res_type","description":"资源类型","sort":1,"createTime":"2020-03-30 17:32:47","updateTime":"2020-04-11 11:54:33","remarks":"VUE插件","delFlag":"0"},
				{"id":8,"value":"2","label":"JQuery插件","type":"res_type","description":"资源类型","sort":2,"createTime":"2020-03-30 17:33:48","updateTime":"2020-04-11 11:54:35","remarks":"JQuery插件","delFlag":"0"},
				{"id":9,"value":"3","label":"壁纸","type":"res_type","description":"资源类型","sort":3,"createTime":"2020-03-30 17:35:49","updateTime":"2020-04-11 11:54:39","remarks":"壁纸","delFlag":"0"}
			]
		}
		// 壁纸

	})
	
	//资源
	// type: 1：VUE 插件  2: Jquery 插件  3：壁纸
	Mock.mock(/\/blog\/resource\/page\?type=*/, 'get', () => {
		//VUE 插件 、Jquery 插件
		return {
			code: 0,
			data: {
				current: 1,
				size: 20,
				records: [{
					content: '<p><br></p><h1>基于Vue的Cron表达式组件</h1><p>基于Vue的Cron表达式组件，cron可选择为分钟、小时、天、星期、月和年，在ldy的基础上做了更新，封装比较简单，没做组件优化，供大家参考&nbsp;&nbsp;</p><p><br></p><p><span style="font-weight: bold;">截图</span></p><p style="text-align: center;"><img src="https://www.zhua91.com/zhua-oss/resource/cron1.png"><br></p><p><br></p><p style="text-align: center;"><img src="https://www.zhua91.com/zhua-oss/resource/cron2.png"><br></p><p><br></p><p style="text-align: center;"><img src="https://www.zhua91.com/zhua-oss/resource/cron3.png"><br></p><p style="text-align: center;"><img src="https://www.zhua91.com/zhua-oss/resource/cron4.png"><br></p><p style="text-align: center;"><img src="https://www.zhua91.com/zhua-oss/resource/cron5.png"><br></p><p style="text-align: center;"><br></p>',
					coverSrc: 'https://www.zhua91.com/zhua-oss/resource/cron2.png',
					createTime: '2020-10-14 14:24:31',
					delFlag: '0',
					downloadCount: 2,
					downloadUrl: 'https://github.com/zhua-an/vue-cron',
					id: 16,
					name: '基于Vue的Cron表达式组件',
					previewCount: 7,
					previewUrl: 'http://oss.zhua91.com/resource/vue-cron/cron.html',
					remarks: '基于Vue的Cron表达式组件，cron可选择为分钟、小时、天、星期、月和年',
					type: '1',
					updateTime: '2020-10-14 14:25:27'
				}]
			}
		}

		// 壁纸
		// return {
		// 	code: 0,
		// 	data: {
		// 		current: 1,
		// 		size: 20,
		// 		records: [
		// 			{"id":17,"name":"手机壁纸","coverSrc":"https://www.zhua91.com/zhua-oss/resource/002F7rn4gy1gjtt2y3ki9j60j60y3jrr02.jpg_fd775c1326eb499a8b722735fc861253","content":"","type":"3","downloadUrl":"https://www.zhua91.com/zhua-oss/resource/002F7rn4gy1gjtt2y3ki9j60j60y3jrr02.jpg_fd775c1326eb499a8b722735fc861253","previewUrl":"https://www.zhua91.com/zhua-oss/resource/002F7rn4gy1gjtt2y3ki9j60j60y3jrr02.jpg_fd775c1326eb499a8b722735fc861253","previewCount":3,"downloadCount":0,"remarks":"手机壁纸","delFlag":"0","createTime":"2020-10-19 21:41:33","updateTime":"2020-10-19 21:41:33"},
		// 			{"id":15,"name":"手机壁纸","coverSrc":"https://www.zhua91.com/zhua-oss/resource/dbc6664772c742bd976de49c47c323f1","content":"","type":"3","downloadUrl":"https://www.zhua91.com/zhua-oss/resource/dbc6664772c742bd976de49c47c323f1","previewUrl":"https://www.zhua91.com/zhua-oss/resource/dbc6664772c742bd976de49c47c323f1","previewCount":0,"downloadCount":0,"remarks":"手机壁纸","delFlag":"0","createTime":"2020-05-12 07:56:22","updateTime":"2020-05-12 07:56:22"},
		// 			{"id":14,"name":"手机壁纸","coverSrc":"https://www.zhua91.com/zhua-oss/resource/355b86fd88bc41f5bfd1df3e897e9e39","content":"","type":"3","downloadUrl":"https://www.zhua91.com/zhua-oss/resource/355b86fd88bc41f5bfd1df3e897e9e39","previewUrl":"https://www.zhua91.com/zhua-oss/resource/355b86fd88bc41f5bfd1df3e897e9e39","previewCount":1,"downloadCount":0,"remarks":"手机壁纸","delFlag":"0","createTime":"2020-05-12 07:55:39","updateTime":"2020-05-12 07:55:39"},
		// 			{"id":13,"name":"手机壁纸","coverSrc":"https://www.zhua91.com/zhua-oss/resource/73d4693777c4470d95e045acfbfe5aaf","content":"","type":"3","downloadUrl":"https://www.zhua91.com/zhua-oss/resource/73d4693777c4470d95e045acfbfe5aaf","previewUrl":"https://www.zhua91.com/zhua-oss/resource/73d4693777c4470d95e045acfbfe5aaf","previewCount":0,"downloadCount":0,"remarks":"手机壁纸","delFlag":"0","createTime":"2020-05-12 07:54:54","updateTime":"2020-05-12 07:54:54"},
		// 			{"id":12,"name":"手机壁纸","coverSrc":"https://www.zhua91.com/zhua-oss/resource/f3db845801984daa85c0467e6939945a","content":"","type":"3","downloadUrl":"https://www.zhua91.com/zhua-oss/resource/f3db845801984daa85c0467e6939945a","previewUrl":"https://www.zhua91.com/zhua-oss/resource/f3db845801984daa85c0467e6939945a","previewCount":0,"downloadCount":0,"remarks":"手机壁纸","delFlag":"0","createTime":"2020-05-12 07:54:14","updateTime":"2020-05-12 07:54:14"}
		// 		]
		// 	}
		// }
	})

	//点击资源
	// type: preview：查看  download: 下载
	Mock.mock(/\/blog\/resource\/handlerResClick\?type=(preview|download)&id=*/, 'post', () => {
		return {
			code: 0,
			data: true
		}
	})

	//资源详情
	Mock.mock(/\/blog\/resource\/\d/, 'get', () => {
		return {
			code: 0,
			data: {
				content: '<p><br></p><h1>基于Vue的Cron表达式组件</h1><p>基于Vue的Cron表达式组件，cron可选择为分钟、小时、天、星期、月和年，在ldy的基础上做了更新，封装比较简单，没做组件优化，供大家参考&nbsp;&nbsp;</p><p><br></p><p><span style="font-weight: bold;">截图</span></p><p style="text-align: center;"><img src="https://www.zhua91.com/zhua-oss/resource/cron1.png"><br></p><p><br></p><p style="text-align: center;"><img src="https://www.zhua91.com/zhua-oss/resource/cron2.png"><br></p><p><br></p><p style="text-align: center;"><img src="https://www.zhua91.com/zhua-oss/resource/cron3.png"><br></p><p style="text-align: center;"><img src="https://www.zhua91.com/zhua-oss/resource/cron4.png"><br></p><p style="text-align: center;"><img src="https://www.zhua91.com/zhua-oss/resource/cron5.png"><br></p><p style="text-align: center;"><br></p>',
				coverSrc: 'https://www.zhua91.com/zhua-oss/resource/cron2.png',
				createTime: '2020-10-14 14:24:31',
				delFlag: '0',
				downloadCount: 2,
				downloadUrl: 'https://github.com/zhua-an/vue-cron',
				id: 16,
				name: '基于Vue的Cron表达式组件',
				previewCount: 7,
				previewUrl: 'http://oss.zhua91.com/resource/vue-cron/cron.html',
				remarks: '基于Vue的Cron表达式组件，cron可选择为分钟、小时、天、星期、月和年',
				type: '1',
				updateTime: '2020-10-14 14:25:27'
			}
		}
	})


	//文章详情
	Mock.mock(/\/blog\/article\/\d/, 'get', () => {
		return {
			code: 0,
			data: {"id":39,"userId":null,"title":"路过秋天，路过你","type":"2","tags":"","href":"","coverSrc":"https://www.zhua91.com/zhua-oss/article/63f821215acf4105b9b5ae9d90afa194","content":"<p>搭一座桥，去你心里瞧一瞧，一个人的世界，是否有万家灯火的明亮，是否像你说的那样喧闹。我只想知道，你的那一扇窗、一盏灯光，为谁在每个夜里点亮。&nbsp;&nbsp;<br></p><p><br></p><p>不同的时空，相同的频率，总有一些灵犀的念，让你情深依依，感动不已。&nbsp;</p><p><br></p><p>千百里云海翻涌，秋风卷起落花的香气；等待，是一场蓄谋已久的盛装出席，相逢，是万里挑一的乍现欢喜。就算在一切经纬度种植期盼，如果有一秒不同，都会错失良机，你就走不到我身边。</p><p>&nbsp;<br></p><p style=\"text-align: center;\"><img src=\"https://www.zhua91.com/zhua-oss/article/c29d93fb94ba44028e1366171de533a1\"><br></p><p style=\"text-align: center;\"><br></p><p>又是清秋，多想，与你重逢在相约的路口，多想，再牵你的手；问一问，你是否，还记得，那年那月那天的承诺，说好了，要一生信守。你是否，和我一样，依然把一种光阴读不懂的温柔，紧紧捂在胸口。<br></p><p>这许多年人生，谁在你心里，赖着不走，你在谁命里，已成故事。世界在你眼中，有多单纯，你就有多善良；曾经向往，也许最适合放逐远方。</p><p><br></p><p>山水跋涉，看到阳光万里的一刻，哪里都会有鲜花开放。满手的承诺，在摊开掌心的一瞬，你于全世界的爱，无限流放……","visitCount":4,"publishFlag":"1","topFlag":"0","delFlag":"0","createTime":"2020-09-16 11:46:06","updateTime":"2020-09-16 11:46:06"}
		}
	})

	//获取上下篇文章
	Mock.mock(/\/blog\/article\/fetchAdjoinArticle\/\d\/*/, 'get', () => {
		return {
			code: 0,
			data: [
				{"id":34,"userId":null,"title":"一朝一夕一瞬间，一来一去一人生","type":"2","tags":"","href":"","coverSrc":"https://www.zhua91.com/zhua-oss/article/c9f4569667b749c5841c4cf90afebc3a","content":"<p>时光仿若流沙，不知不觉，就悄悄见了底。<br>","introduction":"人生匆匆，聚散无常，这世间没有永恒的美丽，只有活在当下的美好。","visitCount":3,"publishFlag":"1","topFlag":"0","delFlag":"0","createTime":"2020-07-16 13:52:56","updateTime":"2020-07-16 13:52:56"},
				{"id":40,"userId":null,"title":"若你回眸，秋风十里","type":"2","tags":"","href":"","coverSrc":"https://www.zhua91.com/zhua-oss/article/13811900755a4dc2b95f34e64d5919ee","content":"<p>岁月，依旧如水静静流淌。翻过的日历，寂静，安然，落满花开花落的香。深秋，却是一笺落雨的清词，少了一份浮躁，多了一份厚重。</p>","visitCount":10,"publishFlag":"1","topFlag":"0","delFlag":"0","createTime":"2020-09-22 09:06:51","updateTime":"2020-09-22 09:06:51"}
			]
		}
	})

}