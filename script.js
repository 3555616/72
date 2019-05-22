var enforcePoints = 895;
var mySkillLists = "覆雨剑法";
var buttonHeight = "20px";
var knownlist = [];
var left0ButtonArray = [];
var left1ButtonArray = [];
var right0ButtonArray = [];
var otherButtonArray = [];
var gameOption = {};
var dispatchMessageListener = {};
var clickButtonListener = {};
var show_userListener = {};
var show_scoreListener = {};
function initGameOption() {
	if (!g_obj_map || !g_obj_map.get("msg_attrs")) {
		setTimeout(initGameOption, 400);
		return
	}
	gameOption = $.parseJSON(localStorage.getItem("__lunjian_GameOption_key__"
			+ g_obj_map.get("msg_attrs").get("id")));
	if (!gameOption) {
		gameOption = {}
	}
}
function saveGameOption() {
	localStorage.setItem("__lunjian_GameOption_key__"
			+ g_obj_map.get("msg_attrs").get("id"), JSON.stringify(gameOption))
}
function getBeiKezhiType(zhaoshi) {
	switch (zhaoshi) {
	case 1:
		return [ 2, 8 ];
	case 2:
		return [ 3, 10 ];
	case 3:
		return [ 1, 9 ];
	case 4:
		return [ 9 ];
	case 5:
		return [ 1, 7 ];
	case 6:
		return [ 2, 5 ];
	case 7:
		return [ 3, 6 ];
	case 8:
		return [ 5 ];
	case 9:
		return [ 7 ];
	case 10:
		return [ 4, 6 ]
	}
	return [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
}
function getKezhiType(zhaoshi) {
	switch (zhaoshi) {
	case 1:
		return [ 3, 5 ];
	case 2:
		return [ 1, 6 ];
	case 3:
		return [ 2, 7 ];
	case 4:
		return [ 10 ];
	case 5:
		return [ 6, 8 ];
	case 6:
		return [ 7, 10 ];
	case 7:
		return [ 5, 9 ];
	case 8:
		return [ 1 ];
	case 9:
		return [ 3, 4 ];
	case 10:
		return [ 2 ]
	}
	return []
}
var AllJianghuSkill = {
	"1" : [ "九天龙吟剑法", "覆雨剑法", "织冰剑法" ],
	"2" : [ "排云掌法", "如来神掌" ],
	"3" : [ "翻云刀法", "雪饮狂刀" ],
	"4" : [ "飞刀绝技", "孔雀翎" ],
	"5" : [ "辉月杖法", "玄天杖法" ],
	"6" : [ "千影百伤棍", "破军棍诀" ],
	"7" : [ "拈花解语鞭", "十怒绞龙索" ],
	"8" : [ "燎原百破", "九溪断月枪" ],
	"9" : [ "四海断潮斩", "昊云破周斧" ],
	"10" : [ "玄胤天雷", "天火飞锤" ]
};
function kezhi(zhaoshi, lianzhenlimit) {
	console.log(zhaoshi);
	var chuzhao = 0;
	var skillname = "";
	var skillbutton = [];
	if (g_obj_map.get("skill_button1") != undefined) {
		skillbutton[0] = ansi_up.ansi_to_text(g_obj_map.get("skill_button1")
				.get("name"))
	} else {
		skillbutton[0] = 0
	}
	if (g_obj_map.get("skill_button2") != undefined) {
		skillbutton[1] = ansi_up.ansi_to_text(g_obj_map.get("skill_button2")
				.get("name"))
	} else {
		skillbutton[1] = 0
	}
	if (g_obj_map.get("skill_button3") != undefined) {
		skillbutton[2] = ansi_up.ansi_to_text(g_obj_map.get("skill_button3")
				.get("name"))
	} else {
		skillbutton[2] = 0
	}
	if (g_obj_map.get("skill_button4") != undefined) {
		skillbutton[3] = ansi_up.ansi_to_text(g_obj_map.get("skill_button4")
				.get("name"))
	} else {
		skillbutton[3] = 0
	}
	if (g_obj_map.get("skill_button5") != undefined) {
		skillbutton[4] = ansi_up.ansi_to_text(g_obj_map.get("skill_button5")
				.get("name"))
	} else {
		skillbutton[4] = 0
	}
	if (g_obj_map.get("skill_button6") != undefined) {
		skillbutton[5] = ansi_up.ansi_to_text(g_obj_map.get("skill_button6")
				.get("name"))
	} else {
		skillbutton[5] = 0
	}
	if (g_obj_map.get("skill_button7") != undefined) {
		skillbutton[6] = ansi_up.ansi_to_text(g_obj_map.get("skill_button7")
				.get("name"))
	} else {
		skillbutton[6] = 0
	}
	if (g_obj_map.get("skill_button8") != undefined) {
		skillbutton[7] = ansi_up.ansi_to_text(g_obj_map.get("skill_button8")
				.get("name"))
	} else {
		skillbutton[7] = 0
	}
	var beikezhizhaoshi = getBeiKezhiType(zhaoshi);
	var kezhizhaoshi = getKezhiType(zhaoshi);
	var ihavebeikezhizhaoshi = [];
	for (var i = 0; i <= beikezhizhaoshi.length; i++) {
		ihavebeikezhizhaoshi = ihavebeikezhizhaoshi
				.concat(AllJianghuSkill[beikezhizhaoshi[i]])
	}
	var ihavenokezhizhaoshi = [];
	for ( var key in AllJianghuSkill) {
		if (kezhizhaoshi.indexOf(key) == -1) {
			ihavenokezhizhaoshi = ihavenokezhizhaoshi
					.concat(AllJianghuSkill[key])
		}
	}
	for (var i = 1; i <= skillbutton.length; i++) {
		if (ihavebeikezhizhaoshi.indexOf(skillbutton[i - 1]) > -1) {
			skillname = skillbutton[i - 1];
			lianzhen(skillname, i, lianzhenlimit);
			return
		}
	}
	for (var i = 1; i <= skillbutton.length; i++) {
		if (ihavenokezhizhaoshi.indexOf(skillbutton[i - 1]) > -1) {
			skillname = skillbutton[i - 1];
			lianzhen(skillname, i, lianzhenlimit);
			return
		}
	}
	skillname = skillbutton[0];
	lianzhen(skillname, 0, lianzhenlimit)
}
function checkzhen(skillname, skillbutton) {
	console.log(skillname + "是我刚刚用的");
	console.log(skillbutton);
	if (skillname == "九天龙吟剑法") {
		return getCheckZhenIndex([ "燎原百破", "千影百伤棍", "排云掌法", "雪饮狂刀" ])
	}
	if (skillname == "排云掌法") {
		return getCheckZhenIndex([ "千影百伤棍", "九天龙吟剑法", "雪饮狂刀", "辉月杖法", "玄胤天雷",
				"十怒绞龙索" ])
	}
	if (skillname == "雪饮狂刀") {
		return getCheckZhenIndex([ "九天龙吟剑法", "排云掌法", "辉月杖法", "十怒绞龙索", "四海断潮斩" ])
	}
	if (skillname == "翻云刀法") {
		return getCheckZhenIndex([ "燎原百破", "破军棍诀", "覆雨剑法", "飞刀绝技", "天火飞锤" ])
	}
	if (skillname == "覆雨剑法") {
		return getCheckZhenIndex([ "如来神掌", "翻云刀法", "昊云破周斧", "拈花解语鞭" ])
	}
	if (skillname == "飞刀绝技") {
		return getCheckZhenIndex([ "破军棍诀", "织冰剑法", "翻云刀法", "四海断潮斩" ])
	}
	if (skillname == "织冰剑法") {
		return getCheckZhenIndex([ "孔雀翎", "飞刀绝技", "玄天杖法", "天火飞锤" ])
	}
	if (skillname == "孔雀翎") {
		return getCheckZhenIndex([ "九溪断月枪", "织冰剑法", "如来神掌", "玄天杖法", "玄胤天雷" ])
	}
	if (skillname == "如来神掌") {
		return getCheckZhenIndex([ "九溪断月枪", "覆雨剑法", "孔雀翎", "昊云破周斧" ])
	}
	if (skillname == "辉月杖法") {
		return getCheckZhenIndex([ "四海断潮斩", "玄胤天雷", "排云掌法", "雪饮狂刀" ])
	}
	if (skillname == "玄天杖法") {
		return getCheckZhenIndex([ "九溪断月枪", "织冰剑法", "孔雀翎", "天火飞锤" ])
	}
	if (skillname == "千影百伤棍") {
		return getCheckZhenIndex([ "燎原百破", "四海断潮斩", "翻云刀法", "排云掌法" ])
	}
	if (skillname == "破军棍诀") {
		return getCheckZhenIndex([ "昊云破周斧", "天火飞锤", "九天龙吟剑法", "飞刀绝技" ])
	}
	if (skillname == "拈花解语鞭") {
		return getCheckZhenIndex([ "九溪断月枪", "昊云破周斧", "覆雨剑法" ])
	}
	if (skillname == "十怒绞龙索") {
		return getCheckZhenIndex([ "燎原百破", "玄胤天雷", "排云掌法", "雪饮狂刀" ])
	}
	if (skillname == "燎原百破") {
		return getCheckZhenIndex([ "千影百伤棍", "十怒绞龙索", "九天龙吟剑法", "翻云刀法" ])
	}
	if (skillname == "九溪断月枪") {
		return getCheckZhenIndex([ "拈花解语鞭", "玄天杖法", "孔雀翎", "如来神掌" ])
	}
	if (skillname == "四海断潮斩") {
		return getCheckZhenIndex([ "辉月杖法", "千影百伤棍", "雪饮狂刀", "飞刀绝技" ])
	}
	if (skillname == "昊云破周斧") {
		return getCheckZhenIndex([ "破军棍诀", "拈花解语鞭", "覆雨剑法", "如来神掌" ])
	}
	if (skillname == "玄胤天雷") {
		return getCheckZhenIndex([ "四海断潮斩", "十怒绞龙索", "排云掌法", "孔雀翎" ])
	}
	if (skillname == "天火飞锤") {
		return getCheckZhenIndex([ "玄天杖法", "破军棍诀", "翻云刀法", "织冰剑法" ])
	}
	function getCheckZhenIndex(zhaoshilist) {
		for (var i = 0; i < zhaoshilist.length; i++) {
			if (skillbutton.indexOf(zhaoshilist[i]) >= 0) {
				return skillbutton.indexOf(zhaoshilist[i])
			}
		}
		return -1
	}
}
function lianzhen(skillname, i, lianzhenlimit) {
	if (!lianzhenlimit) {
		lianzhenlimit = 8
	}
	var enemycounter = 0;
	console.log("目前我有气" + gSocketMsg.get_xdz());
	for (j = 1; j <= 8; j++) {
		if (g_obj_map.get("msg_vs_info").get("vs" + obside + "_name" + j) != undefined) {
			enemycounter++
		}
	}
	var skillbutton = [];
	if (g_obj_map.get("skill_button1") != undefined) {
		skillbutton[0] = ansi_up.ansi_to_text(g_obj_map.get("skill_button1")
				.get("name"))
	} else {
		skillbutton[0] = 0
	}
	if (g_obj_map.get("skill_button2") != undefined) {
		skillbutton[1] = ansi_up.ansi_to_text(g_obj_map.get("skill_button2")
				.get("name"))
	} else {
		skillbutton[1] = 0
	}
	if (g_obj_map.get("skill_button3") != undefined) {
		skillbutton[2] = ansi_up.ansi_to_text(g_obj_map.get("skill_button3")
				.get("name"))
	} else {
		skillbutton[2] = 0
	}
	if (g_obj_map.get("skill_button4") != undefined) {
		skillbutton[3] = ansi_up.ansi_to_text(g_obj_map.get("skill_button4")
				.get("name"))
	} else {
		skillbutton[3] = 0
	}
	if (g_obj_map.get("skill_button5") != undefined) {
		skillbutton[4] = ansi_up.ansi_to_text(g_obj_map.get("skill_button5")
				.get("name"))
	} else {
		skillbutton[4] = 0
	}
	if (g_obj_map.get("skill_button6") != undefined) {
		skillbutton[5] = ansi_up.ansi_to_text(g_obj_map.get("skill_button6")
				.get("name"))
	} else {
		skillbutton[5] = 0
	}
	if (g_obj_map.get("skill_button7") != undefined) {
		skillbutton[6] = ansi_up.ansi_to_text(g_obj_map.get("skill_button7")
				.get("name"))
	} else {
		skillbutton[6] = 0
	}
	if (g_obj_map.get("skill_button8") != undefined) {
		skillbutton[7] = ansi_up.ansi_to_text(g_obj_map.get("skill_button8")
				.get("name"))
	} else {
		skillbutton[7] = 0
	}
	skillname = ansi_up.ansi_to_text(skillname);
	console.log("使用按钮" + i);
	console.log("出招" + skillname);
	var enemyxdz = 0;
	if (enemycounter != 1) {
		for (var i = 1; i <= 8; i++) {
			if (g_obj_map.get("msg_vs_info") != undefined
					&& g_obj_map.get("msg_vs_info").get(
							"vs" + obside + "_xdz" + i) != undefined) {
				enemyxdz = g_obj_map.get("msg_vs_info").get(
						"vs" + obside + "_xdz" + i);
				break
			}
		}
	}
	clickButton("playskill " + (skillbutton.indexOf(skillname) + 1), 0);
	var xdz = gSocketMsg.get_xdz();
	if (g_obj_map.get("skill_button1") != undefined) {
		skillbutton[0] = ansi_up.ansi_to_text(g_obj_map.get("skill_button1")
				.get("name"))
	} else {
		skillbutton[0] = 0
	}
	if (g_obj_map.get("skill_button2") != undefined) {
		skillbutton[1] = ansi_up.ansi_to_text(g_obj_map.get("skill_button2")
				.get("name"))
	} else {
		skillbutton[1] = 0
	}
	if (g_obj_map.get("skill_button3") != undefined) {
		skillbutton[2] = ansi_up.ansi_to_text(g_obj_map.get("skill_button3")
				.get("name"))
	} else {
		skillbutton[2] = 0
	}
	if (g_obj_map.get("skill_button4") != undefined) {
		skillbutton[3] = ansi_up.ansi_to_text(g_obj_map.get("skill_button4")
				.get("name"))
	} else {
		skillbutton[3] = 0
	}
	if (g_obj_map.get("skill_button5") != undefined) {
		skillbutton[4] = ansi_up.ansi_to_text(g_obj_map.get("skill_button5")
				.get("name"))
	} else {
		skillbutton[4] = 0
	}
	if (g_obj_map.get("skill_button6") != undefined) {
		skillbutton[5] = ansi_up.ansi_to_text(g_obj_map.get("skill_button6")
				.get("name"))
	} else {
		skillbutton[5] = 0
	}
	if (g_obj_map.get("skill_button7") != undefined) {
		skillbutton[6] = ansi_up.ansi_to_text(g_obj_map.get("skill_button7")
				.get("name"))
	} else {
		skillbutton[6] = 0
	}
	if (g_obj_map.get("skill_button8") != undefined) {
		skillbutton[7] = ansi_up.ansi_to_text(g_obj_map.get("skill_button8")
				.get("name"))
	} else {
		skillbutton[7] = 0
	}
	var checkbutton = -1;
	checkbutton = checkzhen(skillname, skillbutton);
	if (checkbutton >= 0) {
		if (xdz >= lianzhenlimit) {
			console.log("连阵按钮" + (checkbutton + 1));
			console.log("我要出的绝学是"
					+ g_obj_map.get("skill_button" + (checkbutton + 1)).get(
							"name"));
			clickButton("playskill " + (checkbutton + 1), 0)
		}
	}
}
function whofighting(msg, oblist) {
	for (var i = 0; i < 8; i++) {
		if ((msg.match(oblist[i] + "将招式连成") != null)
				|| (msg.match(oblist[i] + "招式之间组合") != null)
				|| (msg.match(oblist[i] + "这几招配合") != null)) {
			return 1
		}
	}
	return 0
}
function fighttype(msg) {
	var sword, cuff, blade, an, zhang, gun, bian, qiang, fu, chui;
	sword = msg.lastIndexOf("剑");
	cuff = msg.lastIndexOf("掌");
	if (msg.lastIndexOf("拳") > cuff) {
		cuff = msg.lastIndexOf("拳")
	}
	blade = msg.lastIndexOf("刀");
	an = Math.max(msg.lastIndexOf("翎"), msg.lastIndexOf("飞刀"));
	zhang = msg.lastIndexOf("杖");
	gun = msg.lastIndexOf("棍");
	bian = Math.max(msg.lastIndexOf("鞭"), msg.lastIndexOf("索"));
	qiang = Math.max(msg.lastIndexOf("燎原"), msg.lastIndexOf("枪"));
	fu = Math.max(msg.lastIndexOf("斧"), msg.lastIndexOf("断潮"));
	chui = Math.max(msg.lastIndexOf("天雷"), msg.lastIndexOf("锤"));
	var max = Math.max(sword, cuff, blade, an, zhang, gun, bian, qiang, fu,
			chui);
	if (sword == max) {
		return 1
	} else {
		if (cuff == max) {
			return 2
		} else {
			if (blade == max) {
				return 3
			} else {
				if (an == max) {
					return 4
				} else {
					if (zhang == max) {
						return 5
					} else {
						if (gun == max) {
							return 6
						} else {
							if (bian == max) {
								return 7
							} else {
								if (qiang == max) {
									return 8
								} else {
									if (fu == max) {
										return 9
									} else {
										if (chui == max) {
											return 10
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
function pozhaofailed(msg, oblist) {
	for (var i = 0; i < 4; i++) {
		if (msg.match(oblist[i] + "的招式并未有明显破绽") != null) {
			return 1
		}
	}
	if (msg.match("你的招式尽数被") != null || msg.match("你的对攻无法击破") != null
			|| msg.match("击向了你的破绽") != null || msg.match("你一不留神") != null
			|| msg.match("你这一招并未奏效") != null) {
		return 1
	}
	return 0
}
var obside = 0;
function Combat() {
	this.dispatchMessage = function(b) {
		var type = b.get("type"), subType = b.get("subtype");
		if (type == "vs" && subType == "text") {
			var oblist = [];
			var melist = [];
			var obxdz = [];
			var mexdz = [];
			var kuafu = 0;
			var who = 0;
			if (g_obj_map.get("msg_attrs").get("name").match("]") == null) {
				var myname = ansi_up.ansi_to_text(g_obj_map.get("msg_attrs")
						.get("name"));
				kuafu = 0
			} else {
				var myname = ansi_up.ansi_to_text(
						g_obj_map.get("msg_attrs").get("name")).split("]")[1];
				kuafu = 1
			}
			console.log(myname);
			console.log(kuafu);
			for (var i = 0; i < 8; i++) {
				if (g_obj_map.get("msg_vs_info") != undefined) {
					if (g_obj_map.get("msg_vs_info").get("vs2_name" + (i + 1)) != undefined) {
						if (ansi_up.ansi_to_text(
								g_obj_map.get("msg_vs_info").get(
										"vs2_name" + (i + 1))).match("]") != null) {
							console
									.log(ansi_up.ansi_to_text(
											g_obj_map.get("msg_vs_info").get(
													"vs2_name" + (i + 1)))
											.split("]")[1]);
							if (ansi_up.ansi_to_text(
									g_obj_map.get("msg_vs_info").get(
											"vs2_name" + (i + 1))).split("]")[1] == myname) {
								obside = 1
							}
						} else {
							if (ansi_up.ansi_to_text(g_obj_map.get(
									"msg_vs_info").get("vs2_name" + (i + 1))) == myname) {
								obside = 1
							}
						}
					}
				}
				if (g_obj_map.get("msg_vs_info") != undefined) {
					if (g_obj_map.get("msg_vs_info").get("vs1_name" + (i + 1)) != undefined) {
						if (ansi_up.ansi_to_text(
								g_obj_map.get("msg_vs_info").get(
										"vs1_name" + (i + 1))).match("]") != null) {
							console
									.log(ansi_up.ansi_to_text(
											g_obj_map.get("msg_vs_info").get(
													"vs1_name" + (i + 1)))
											.split("]")[1]);
							if (ansi_up.ansi_to_text(
									g_obj_map.get("msg_vs_info").get(
											"vs1_name" + (i + 1))).split("]")[1] == myname) {
								obside = 2
							}
						} else {
							if (ansi_up.ansi_to_text(g_obj_map.get(
									"msg_vs_info").get("vs1_name" + (i + 1))) == myname) {
								obside = 2
							}
						}
					}
				}
			}
			console.log(obside);
			for (var i = 0; i < 8; i++) {
				if (g_obj_map.get("msg_vs_info") != undefined
						&& g_obj_map.get("msg_vs_info").get(
								"vs" + obside + "_name" + (i + 1)) != undefined
						&& g_obj_map.get("msg_vs_info").get(
								"vs" + obside + "_name" + (i + 1)) != undefined) {
					if (g_obj_map.get("msg_vs_info").get(
							"vs" + obside + "_name" + (i + 1)).match("]") != null) {
						oblist.push(ansi_up.ansi_to_text(
								g_obj_map.get("msg_vs_info").get(
										"vs" + obside + "_name" + (i + 1)))
								.split("]")[1])
					} else {
						oblist.push(ansi_up.ansi_to_text(g_obj_map.get(
								"msg_vs_info").get(
								"vs" + obside + "_name" + (i + 1))))
					}
					obxdz.push(g_obj_map.get("msg_vs_info").get(
							"vs" + obside + "_xdz" + (i + 1)))
				}
			}
			console.log(oblist);
			var msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
			var zhaoshi = 0;
			if (whofighting(msg, oblist)) {
				zhaoshi = fighttype(msg);
				kezhi(zhaoshi, obside)
			}
			if (pozhaofailed(msg, oblist)) {
				buzhao()
			}
			if (gSocketMsg.get_xdz() >= 8) {
				console.log("主动出阵");
				kezhi(0)
			}
		}
		if (type == "notice" && subType == "escape") {
			console.log(g_simul_efun.replaceControlCharBlank(b.get("msg")))
		}
	}
}
function buzhao() {
	var myxdz = gSocketMsg.get_xdz();
	if (myxdz >= 3) {
		for (var i = 1; i <= 8; i++) {
			if (g_obj_map.get("skill_button" + i) != undefined
					&& (ansi_up.ansi_to_text(g_obj_map.get("skill_button" + i)
							.get("name")) == "飞刀绝技"
							|| ansi_up.ansi_to_text(g_obj_map.get(
									"skill_button" + i).get("name")) == "孔雀翎"
							|| ansi_up.ansi_to_text(g_obj_map.get(
									"skill_button" + i).get("name")) == "雪饮狂刀"
							|| ansi_up.ansi_to_text(g_obj_map.get(
									"skill_button" + i).get("name")) == "翻云刀法"
							|| ansi_up.ansi_to_text(g_obj_map.get(
									"skill_button" + i).get("name")) == "九天龙吟剑法"
							|| ansi_up.ansi_to_text(g_obj_map.get(
									"skill_button" + i).get("name")) == "覆雨剑法"
							|| ansi_up.ansi_to_text(g_obj_map.get(
									"skill_button" + i).get("name")) == "织冰剑法"
							|| ansi_up.ansi_to_text(g_obj_map.get(
									"skill_button" + i).get("name")) == "排云掌法" || ansi_up
							.ansi_to_text(g_obj_map.get("skill_button" + i)
									.get("name")) == "如来神掌")) {
				if (g_obj_map.get("skill_button" + i).get("xdz") == 3) {
					clickButton("playskill " + i, 0)
				}
			}
		}
	} else {
		if (myxdz == 2) {
			for (var i = 1; i <= 8; i++) {
				if (g_obj_map.get("skill_button" + i) != undefined) {
					if (g_obj_map.get("skill_button" + i).get("xdz") == 2) {
						clickButton("playskill " + i, 0)
					}
				}
			}
		}
	}
}
var combat = new Combat;
var buttonhiden = 0;
var buttonhideButton = document.createElement("button");
buttonhideButton.innerText = "";
buttonhideButton.style.position = "absolute";
buttonhideButton.style.left = "50px";
buttonhideButton.style.top = "0px";
buttonhideButton.style.width = "120px";
buttonhideButton.style.height = "30px";
buttonhideButton.style.backgroundColor = "transparent";
buttonhideButton.style.border = "none";
document.body.appendChild(buttonhideButton);
buttonhideButton.addEventListener("click", buttonhideFunc);
function buttonhideFunc() {
	if (buttonhiden == 0) {
		buttonhiden = 1;
		hideButton()
	} else {
		buttonhiden = 0;
		showButton()
	}
}
var lastheartbeat = 0;
var currentheartbeat = 0;
var killhideButton = document.createElement("button");
killhideButton.innerText = "显示id";
killhideButton.style.height = buttonHeight;
killhideButton.addEventListener("click", killhideFunc);
right0ButtonArray.push(killhideButton);
function killhideFunc() {
	if (g_obj_map.get("msg_vs_info")) {
		if (g_obj_map.get("msg_vs_info").get("vs2_pos1")) {
			writeToScreen(g_obj_map.get("msg_vs_info").get("vs2_pos1")
					+ " [<a href=\"javascript:clickButton('kill "
					+ g_obj_map.get("msg_vs_info").get("vs2_pos1")
					+ "')\">杀</a> , <a href=\"javascript:clickButton('fight "
					+ g_obj_map.get("msg_vs_info").get("vs2_pos1")
					+ "')\">切磋</a>]", 2, 1)
		}
		if (g_obj_map.get("msg_vs_info").get("vs2_pos2")) {
			writeToScreen(g_obj_map.get("msg_vs_info").get("vs2_pos2")
					+ " [<a href=\"javascript:clickButton('kill "
					+ g_obj_map.get("msg_vs_info").get("vs2_pos2")
					+ "')\">杀</a> , <a href=\"javascript:clickButton('fight "
					+ g_obj_map.get("msg_vs_info").get("vs2_pos2")
					+ "')\">切磋</a>]", 2, 1)
		}
		if (g_obj_map.get("msg_vs_info").get("vs2_pos3")) {
			writeToScreen(g_obj_map.get("msg_vs_info").get("vs2_pos3")
					+ " [<a href=\"javascript:clickButton('kill "
					+ g_obj_map.get("msg_vs_info").get("vs2_pos3")
					+ "')\">杀</a> , <a href=\"javascript:clickButton('fight "
					+ g_obj_map.get("msg_vs_info").get("vs2_pos3")
					+ "')\">切磋</a>]", 2, 1)
		}
		if (g_obj_map.get("msg_vs_info").get("vs2_pos4")) {
			writeToScreen(g_obj_map.get("msg_vs_info").get("vs2_pos4")
					+ " [<a href=\"javascript:clickButton('kill "
					+ g_obj_map.get("msg_vs_info").get("vs2_pos4")
					+ "')\">杀</a> , <a href=\"javascript:clickButton('fight "
					+ g_obj_map.get("msg_vs_info").get("vs2_pos4")
					+ "')\">切磋</a>]", 2, 1)
		}
		if (g_obj_map.get("msg_vs_info").get("vs2_pos5")) {
			writeToScreen(g_obj_map.get("msg_vs_info").get("vs2_pos5")
					+ " [<a href=\"javascript:clickButton('kill "
					+ g_obj_map.get("msg_vs_info").get("vs2_pos5")
					+ "')\">杀</a> , <a href=\"javascript:clickButton('fight "
					+ g_obj_map.get("msg_vs_info").get("vs2_pos5")
					+ "')\">切磋</a>]", 2, 1)
		}
		if (g_obj_map.get("msg_vs_info").get("vs2_pos6")) {
			writeToScreen(g_obj_map.get("msg_vs_info").get("vs2_pos6")
					+ " [<a href=\"javascript:clickButton('kill "
					+ g_obj_map.get("msg_vs_info").get("vs2_pos6")
					+ "')\">杀</a> , <a href=\"javascript:clickButton('fight "
					+ g_obj_map.get("msg_vs_info").get("vs2_pos6")
					+ "')\">切磋</a>]", 2, 1)
		}
		if (g_obj_map.get("msg_vs_info").get("vs2_pos7")) {
			writeToScreen(g_obj_map.get("msg_vs_info").get("vs2_pos7")
					+ " [<a href=\"javascript:clickButton('kill "
					+ g_obj_map.get("msg_vs_info").get("vs2_pos7")
					+ "')\">杀</a> , <a href=\"javascript:clickButton('fight "
					+ g_obj_map.get("msg_vs_info").get("vs2_pos7")
					+ "')\">切磋</a>]", 2, 1)
		}
		if (g_obj_map.get("msg_vs_info").get("vs2_pos8")) {
			writeToScreen(g_obj_map.get("msg_vs_info").get("vs2_pos8")
					+ " [<a href=\"javascript:clickButton('kill "
					+ g_obj_map.get("msg_vs_info").get("vs2_pos8")
					+ "')\">杀</a> , <a href=\"javascript:clickButton('fight "
					+ g_obj_map.get("msg_vs_info").get("vs2_pos8")
					+ "')\">切磋</a>]", 2, 1)
		}
		if (g_obj_map.get("msg_vs_info").get("vs1_pos1")) {
			writeToScreen(g_obj_map.get("msg_vs_info").get("vs1_pos1")
					+ " [<a href=\"javascript:clickButton('kill "
					+ g_obj_map.get("msg_vs_info").get("vs1_pos1")
					+ "')\">杀</a> , <a href=\"javascript:clickButton('fight "
					+ g_obj_map.get("msg_vs_info").get("vs1_pos1")
					+ "')\">切磋</a>]", 2, 1)
		}
		if (g_obj_map.get("msg_vs_info").get("vs1_pos2")) {
			writeToScreen(g_obj_map.get("msg_vs_info").get("vs1_pos2")
					+ " [<a href=\"javascript:clickButton('kill "
					+ g_obj_map.get("msg_vs_info").get("vs1_pos2")
					+ "')\">杀</a> , <a href=\"javascript:clickButton('fight "
					+ g_obj_map.get("msg_vs_info").get("vs1_pos2")
					+ "')\">切磋</a>]", 2, 1)
		}
		if (g_obj_map.get("msg_vs_info").get("vs1_pos3")) {
			writeToScreen(g_obj_map.get("msg_vs_info").get("vs1_pos3")
					+ " [<a href=\"javascript:clickButton('kill "
					+ g_obj_map.get("msg_vs_info").get("vs1_pos3")
					+ "')\">杀</a> , <a href=\"javascript:clickButton('fight "
					+ g_obj_map.get("msg_vs_info").get("vs1_pos3")
					+ "')\">切磋</a>]", 2, 1)
		}
		if (g_obj_map.get("msg_vs_info").get("vs1_pos4")) {
			writeToScreen(g_obj_map.get("msg_vs_info").get("vs1_pos4")
					+ " [<a href=\"javascript:clickButton('kill "
					+ g_obj_map.get("msg_vs_info").get("vs1_pos4")
					+ "')\">杀</a> , <a href=\"javascript:clickButton('fight "
					+ g_obj_map.get("msg_vs_info").get("vs1_pos4")
					+ "')\">切磋</a>]", 2, 1)
		}
		if (g_obj_map.get("msg_vs_info").get("vs1_pos5")) {
			writeToScreen(g_obj_map.get("msg_vs_info").get("vs1_pos5")
					+ " [<a href=\"javascript:clickButton('kill "
					+ g_obj_map.get("msg_vs_info").get("vs1_pos5")
					+ "')\">杀</a> , <a href=\"javascript:clickButton('fight "
					+ g_obj_map.get("msg_vs_info").get("vs1_pos5")
					+ "')\">切磋</a>]", 2, 1)
		}
		if (g_obj_map.get("msg_vs_info").get("vs1_pos6")) {
			writeToScreen(g_obj_map.get("msg_vs_info").get("vs1_pos6")
					+ " [<a href=\"javascript:clickButton('kill "
					+ g_obj_map.get("msg_vs_info").get("vs1_pos6")
					+ "')\">杀</a> , <a href=\"javascript:clickButton('fight "
					+ g_obj_map.get("msg_vs_info").get("vs1_pos6")
					+ "')\">切磋</a>]", 2, 1)
		}
		if (g_obj_map.get("msg_vs_info").get("vs1_pos7")) {
			writeToScreen(g_obj_map.get("msg_vs_info").get("vs1_pos7")
					+ " [<a href=\"javascript:clickButton('kill "
					+ g_obj_map.get("msg_vs_info").get("vs1_pos7")
					+ "')\">杀</a> , <a href=\"javascript:clickButton('fight "
					+ g_obj_map.get("msg_vs_info").get("vs1_pos7")
					+ "')\">切磋</a>]", 2, 1)
		}
		if (g_obj_map.get("msg_vs_info").get("vs1_pos8")) {
			writeToScreen(g_obj_map.get("msg_vs_info").get("vs1_pos8")
					+ " [<a href=\"javascript:clickButton('kill "
					+ g_obj_map.get("msg_vs_info").get("vs1_pos8")
					+ "')\">杀</a> , <a href=\"javascript:clickButton('fight "
					+ g_obj_map.get("msg_vs_info").get("vs1_pos8")
					+ "')\">切磋</a>]", 2, 1)
		}
	}
}
var taofanButton = document.createElement("button");
taofanButton.innerText = "跨服逃犯";
taofanButton.isBenfu = false;
left0ButtonArray.push(taofanButton);
taofanButton.addEventListener("click", taofanFunc);
var taofanTrigger = 0;
var autotaofanRunTimer = null;
var taofanRadio1 = document.createElement("INPUT");
taofanRadio1.type = "radio";
taofanRadio1.name = "taofanSelect";
taofanRadio1.checked = "checked";
var taofanlabel1 = document.createElement("label");
taofanlabel1.innerText = "杀恶人";
taofanlabel1.style.visibility = "hidden";
taofanlabel1.style.position = "absolute";
taofanlabel1.appendChild(taofanRadio1);
taofanlabel1.style.top = 0;
document.body.appendChild(taofanlabel1);
otherButtonArray.push(taofanlabel1);
var taofanRadio2 = document.createElement("INPUT");
taofanRadio2.type = "radio";
taofanRadio2.name = "taofanSelect";
var taofanlabel2 = document.createElement("label");
taofanlabel2.innerText = "杀好人";
taofanlabel2.style.visibility = "hidden";
taofanlabel2.style.position = "absolute";
taofanlabel2.style.top = 0;
taofanlabel2.appendChild(taofanRadio2);
document.body.appendChild(taofanlabel2);
otherButtonArray.push(taofanlabel2);
var taofanTriggerFunc = function(b) {
	var type = b.get("type"), msg = b.get("msg"), subtype = b.get("subtype");
	if (type && subtype && msg && type == "channel" && subtype == "sys") {
		msg = ansi_up.ansi_to_text(msg);
		var reg = /【系统】\[1-5区\]\S*段老大\S*慌不择路，逃往了\S*find_qinglong_road \d*/;
		if (reg.test(msg)) {
			var reg1 = /find_qinglong_road \d*/;
			var result = reg1.exec(msg);
			if (result && result.length > 0) {
				clickButton(result[0], 0);
				autotaofanRunTimer = setInterval(killtaofan, 300)
			}
		}
	}
};
function killtaofan() {
	if (g_gmain.is_fighting) {
		clearInterval(autotaofanRunTimer);
		window.singleBattleTrigger = 0;
		return
	}
	var found = false;
	for (var i = 0; i < g_obj_map.get("msg_room").size(); i++) {
		var npcinfo = g_obj_map.get("msg_room").get("npc" + (i + 1));
		if (npcinfo) {
			var npcinfoarr = npcinfo.split(",");
			var reg = $(taofanRadio1).is(":checked") ? /\[1-5区\]\S*段老大/
					: /\[1-5区\]\S*无一/;
			if (reg.test(npcinfoarr[1])) {
				window.singleBattleTrigger = 1;
				window.singleBattleInstance = new window.singleBattle(
						function() {
							clearInterval(autotaofanRunTimer)
						});
				clickButton("kill " + npcinfoarr[0], 0);
				found = true;
				break
			}
		}
	}
	if (!found) {
		clearInterval(autotaofanRunTimer);
		window.singleBattleTrigger = 0
	}
}
function taofanFunc() {
	if (taofanTrigger == 0) {
		dispatchMessageList.push(taofanTriggerFunc);
		taofanTrigger = 1;
		taofanButton.innerText = "停止逃犯";
		taofanlabel1.style.left = "75px";
		taofanlabel1.style.top = $(taofanButton).offset().top - 10 + "px";
		taofanlabel1.style.visibility = "visible";
		taofanlabel1.style.backgroundColor = "rgba(255,255,255,0.4)";
		taofanlabel2.style.left = "75px";
		taofanlabel2.style.top = $(taofanButton).offset().top + 15 + "px";
		taofanlabel2.style.visibility = "visible";
		taofanlabel2.style.backgroundColor = "rgba(255,255,255,0.4)"
	} else {
		if (taofanTrigger == 1) {
			if (dispatchMessageList.indexOf(taofanTriggerFunc) > -1) {
				dispatchMessageList.splice(dispatchMessageList
						.indexOf(taofanTriggerFunc), 1)
			}
			taofanTrigger = 0;
			taofanButton.innerText = "跨服逃犯";
			taofanlabel1.style.visibility = "hidden";
			taofanlabel2.style.visibility = "hidden"
		}
	}
}
var tianjianButton = document.createElement("button");
tianjianButton.innerText = "跨服天剑谷";
tianjianButton.isBenfu = false;
left0ButtonArray.push(tianjianButton);
var tianjianCheckbox1 = document.createElement("INPUT");
tianjianCheckbox1.type = "checkbox";
tianjianCheckbox1.name = "tianjianSelect";
var tianjianlabel1 = document.createElement("label");
tianjianlabel1.innerText = "杀虹氏";
tianjianlabel1.style.visibility = "hidden";
tianjianlabel1.style.position = "absolute";
tianjianlabel1.appendChild(tianjianCheckbox1);
tianjianlabel1.style.top = 0;
document.body.appendChild(tianjianlabel1);
otherButtonArray.push(tianjianlabel1);
var tianjianCheckbox2 = document.createElement("INPUT");
tianjianCheckbox2.type = "checkbox";
tianjianCheckbox2.name = "tianjianSelect";
var tianjianlabel2 = document.createElement("label");
tianjianlabel2.innerText = "杀天剑";
tianjianlabel2.style.visibility = "hidden";
tianjianlabel2.style.position = "absolute";
tianjianlabel2.style.top = 0;
tianjianlabel2.appendChild(tianjianCheckbox2);
document.body.appendChild(tianjianlabel2);
otherButtonArray.push(tianjianlabel2);
var tianjianCheckbox3 = document.createElement("INPUT");
tianjianCheckbox3.type = "checkbox";
tianjianCheckbox3.name = "tianjianSelect";
var tianjianlabel3 = document.createElement("label");
tianjianlabel3.innerText = "杀小怪";
tianjianlabel3.style.visibility = "hidden";
tianjianlabel3.style.position = "absolute";
tianjianlabel3.style.top = 0;
tianjianlabel3.appendChild(tianjianCheckbox3);
document.body.appendChild(tianjianlabel3);
otherButtonArray.push(tianjianlabel3);
tianjianButton.addEventListener("click", tianjianFunc);
var tianjianTrigger = 0;
var tianjiankilltimer = null;
function tianjianFunc() {
	if (tianjianTrigger == 0) {
		tianjianButton.innerText = "停止天剑谷";
		tianjianTrigger = 1;
		if (!g_obj_map.get("msg_team")) {
			clickButton("team")
		}
		startTianjianMove();
		tianjianlabel1.style.left = "75px";
		tianjianlabel1.style.top = $(tianjianButton).offset().top - 10 + "px";
		tianjianlabel1.style.visibility = "visible";
		tianjianlabel1.style.backgroundColor = "rgba(255,255,255,0.4)";
		tianjianlabel2.style.left = "75px";
		tianjianlabel2.style.top = $(tianjianButton).offset().top + 15 + "px";
		tianjianlabel2.style.visibility = "visible";
		tianjianlabel2.style.backgroundColor = "rgba(255,255,255,0.4)";
		tianjianlabel3.style.left = "75px";
		tianjianlabel3.style.top = $(tianjianButton).offset().top + 40 + "px";
		tianjianlabel3.style.visibility = "visible";
		tianjianlabel3.style.backgroundColor = "rgba(255,255,255,0.4)"
	} else {
		if (tianjianTrigger == 1) {
			tianjianButton.innerText = "跨服天剑谷";
			tianjianTrigger = 0;
			tianjianlabel1.style.visibility = "hidden";
			tianjianlabel2.style.visibility = "hidden";
			tianjianlabel3.style.visibility = "hidden";
			clearInterval(tianjiankilltimer)
		}
	}
}
function startTianjianMove() {
	if (hasGoToEnd() && g_obj_map.get("msg_team") && window.hasReachRoom) {
		tianjiankilltimer = setInterval(tianjianmove, 100)
	} else {
		setTimeout(function() {
			startTianjianMove()
		}, 200)
	}
}
var direction = [ "west", "east", "south", "north", "southwest", "southeast",
		"northeast", "northwest" ];
var recordroompath = "";
function tianjianmove() {
	if (tianjianTrigger != 1) {
		return
	}
	var roominfo = g_obj_map.get("msg_room");
	if (roominfo == undefined || !hasGoToEnd() || g_gmain.is_fighting
			|| !window.hasReachRoom) {
		return
	}
	if (!$(tianjianCheckbox1).is(":checked")
			&& !$(tianjianCheckbox2).is(":checked")
			&& !$(tianjianCheckbox3).is(":checked")) {
		return
	} else {
		var allnpcs = roominfo.elements.filter(function(item) {
			return item.key.indexOf("npc") > -1
		});
		if (allnpcs.length > 0) {
			if ($(tianjianCheckbox1).is(":checked")) {
				var npcs = allnpcs.filter(function(item) {
					return item.value.indexOf("虹") > -1
				});
				console.log("npc check 1");
				if (npcs.length > 0) {
					killtianjian(npcs[0].value);
					return
				}
			}
			if ($(tianjianCheckbox2).is(":checked")) {
				var npcs = allnpcs.filter(function(item) {
					return item.value.split(",")[1] == "天剑"
				});
				console.log("npc check 2");
				if (npcs.length > 0) {
					killtianjian(npcs[0].value);
					return
				}
			}
			if ($(tianjianCheckbox3).is(":checked")) {
				var npcs = allnpcs.filter(function(item) {
					return item.value.split(",")[1] == "天剑谷卫士"
				});
				console.log("npc check 3");
				if (npcs.length > 0) {
					window.singleBattleTrigger = 1;
					window.singleBattleInstance = new window.singleBattle();
					clickButton("kill " + npcs[0].value.split(",")[0]);
					return
				}
			}
		}
		if (!g_obj_map.get("msg_team").get("team_id")
				|| g_obj_map.get("msg_team").get("is_leader") == "1") {
			var currentroompath = getRoomInfo(roominfo);
			if (currentroompath == recordroompath && recordroompath) {
				return
			} else {
				recordroompath = currentroompath
			}
			var allpaths = roominfo.elements.filter(function(item) {
				return direction.indexOf(item.key) > -1
			});
			if ($(tianjianCheckbox1).is(":checked")) {
				var paths = allpaths.filter(function(item) {
					return item.value.indexOf("峡谷") == -1 && item.value != "湖边"
				});
				console.log("path check 1");
				if (paths.length > 0) {
					var index = Math.floor(Math.random() * paths.length);
					clickButton("go " + paths[index].key);
					return
				}
			}
			if ($(tianjianCheckbox2).is(":checked")) {
				var paths = allpaths.filter(function(item) {
					return item.value == "湖边"
				});
				console.log("path check 2");
				if (paths.length > 0) {
					var index = Math.floor(Math.random() * paths.length);
					clickButton("go " + paths[index].key);
					return
				}
			}
			var index = Math.floor(Math.random() * allpaths.length);
			window.hasReachRoom = false;
			clickButton("go " + allpaths[index].key)
		}
	}
}
function killtianjian(npc) {
	var npcid = npc.split(",")[0];
	if (!g_obj_map.get("msg_npc")
			|| g_obj_map.get("msg_npc").get("id") != npcid) {
		clickButton("look_npc " + npcid);
		return
	}
	if (g_obj_map.get("msg_npc").elements.filter(function(item) {
		return item.value == "观战"
	}).length > 0) {
		return
	}
	window.singleBattleTrigger = 1;
	window.singleBattleInstance = new window.singleBattle();
	clickButton("kill " + npcid)
}
function getRoomInfo(roominfo) {
	if (!roominfo) {
		return ""
	}
	var roompath = "";
	for (var i = direction.length - 1; i >= 0; i--) {
		roompath += roominfo.get(direction[i]) ? roominfo.get(direction[i])
				: "";
		roompath += "|"
	}
	return roompath
}
var bangfuButton = document.createElement("button");
bangfuButton.innerText = "帮派副本";
right0ButtonArray.push(bangfuButton);
bangfuButton.addEventListener("click", bangfuFunc);
var bangfuTrigger = 0;
var bangfuKilling = false;
var bangfuTimer = null;
var bangfuKillTimer = null;
var autoBangfuRunDirection = "west";
var autoBangfuRunTrigger = false;
var autoBangfuRunTimer = null;
var hasBuDongSkill = -1;
var hasZixueSkill = -1;
function bangfuFunc() {
	if (bangfuTrigger == 0) {
		bangfuButton.innerText = "停止帮副";
		bangfuTrigger = 1;
		clearInterval(bangfuTimer);
		bangfuTimer = null;
		clearInterval(bangfuKillTimer);
		bangfuKillTimer = setInterval(autoKill, 500);
		if (g_obj_map.get("msg_room")
				&& g_obj_map.get("msg_room").get("map_id")
				&& g_obj_map.get("msg_room").get("map_id") == "shenshousenlin") {
			go("team");
			startBangfuRun()
		}
	} else {
		if (bangfuTrigger == 1) {
			bangfuButton.innerText = "帮派副本";
			bangfuTrigger = 0;
			clearInterval(bangfuTimer);
			bangfuTimer = null;
			clearInterval(bangfuKillTimer);
			autoBangfuRunTrigger = false;
			clearInterval(autoBangfuRunTimer)
		}
	}
}
function startBangfuRun() {
	if (hasGoToEnd()) {
		if (g_obj_map.get("msg_team").get("is_leader") == "1") {
			autoBangfuRunTrigger = true;
			autoBangfuRun()
		} else {
			autoBangfuRunTrigger = false;
			clearInterval(autoBangfuRunTimer)
		}
	} else {
		setTimeout(function() {
			startBangfuRun()
		}, 100)
	}
}
function autoBangfuRun() {
	autoBangfuRunTimer = setInterval(
			function() {
				if (!hasGoToEnd()) {
					return
				}
				if (g_obj_map.get("msg_room")
						&& g_obj_map.get("msg_room").get("npc1")) {
					if (is_fighting == 0) {
						if (!bangfuKillTimer) {
							autoKill()
						}
					}
					return
				}
				if (!autoBangfuRunTrigger) {
					return
				}
				if (autoBangfuRunDirection == "west") {
					if (g_obj_map.get("msg_room").get(autoBangfuRunDirection)) {
						go("w")
					} else {
						autoBangfuRunDirection = "east"
					}
					return
				}
				if (autoBangfuRunDirection == "east") {
					if (g_obj_map.get("msg_room").get(autoBangfuRunDirection)) {
						go("e")
					} else {
						autoBangfuRunDirection = "south"
					}
					return
				}
				if (autoBangfuRunDirection == "south") {
					if (g_obj_map.get("msg_room").get(autoBangfuRunDirection)) {
						go("s");
						autoBangfuRunDirection = "west"
					} else {
						if (g_obj_map.get("msg_room").get("west")) {
							go("w")
						} else {
							if (g_obj_map.get("msg_room").get("east")) {
								go("e")
							} else {
								autoBangfuRunTrigger = false;
								clearInterval(autoBangfuRunTimer)
							}
						}
					}
					return
				}
			}, 400)
}
var neigongPlayCount = 0;
function bangfuDo() {
	this.dispatchMessage = function(b) {
		var type = b.get("type"), subType = b.get("subtype");
		if (g_gmain.is_fighting && !bangfuTimer) {
			clearInterval(bangfuTimer);
			bangfuTimer = null;
			setTimeout(function() {
				autoSkill(true)
			}, 500);
			bangfuTimer = setInterval(function() {
				autoSkill(true)
			}, 1000)
		} else {
			if (!g_gmain.is_fighting
					&& ((type == "vs" && subType == "combat_result") || (type = "notice"
							&& subType == "escape"))) {
				neigongPlayCount = 0;
				if (hasBuDongSkill == 0) {
					autoDrug()
				}
				clearInterval(bangfuTimer);
				bangfuTimer = null;
				bangfuKilling = false
			}
		}
	}
}
function autoSkill(escapeWhenNeigonglimit) {
	escapeWhenNeigonglimit = escapeWhenNeigonglimit || 0;
	if (escapeWhenNeigonglimit && neigongPlayCount >= 3 && escapeTrigger == 0
			&& hasZixueSkill == -1) {
		escapeStart()
	}
	if (gSocketMsg.get_xdz() < 2 || chuzhenTrigger == 1 || chuzhen2Trigger == 1) {
		return
	}
	var kee = +g_obj_map.get("msg_attrs").get("kee");
	var max_kee = +g_obj_map.get("msg_attrs").get("max_kee");
	var force = +g_obj_map.get("msg_attrs").get("force");
	var max_force = +g_obj_map.get("msg_attrs").get("max_force");
	var enforce = +g_obj_map.get("msg_attrs").get("force_factor");
	if (kee / max_kee < 0.5 && force > 0 && neigongPlayCount < 3) {
		if (gSocketMsg.get_xdz() < 3) {
			return
		}
		var gaojineigong = [ "生生造化功", "道种心魔经" ];
		var zixueneigong = "紫血大法";
		var neigong = [ "碧血心法", "易筋经神功", "八荒功", "葵花宝典", "紫霞神功", "天邪神功",
				"不动明王诀", "茅山道术" ];
		for (var i = 1; i <= 8; i++) {
			if (g_obj_map.get("skill_button" + i) != undefined
					&& $.inArray(ansi_up.ansi_to_text(g_obj_map.get(
							"skill_button" + i).get("name")), gaojineigong) > -1) {
				clickButton("playskill " + i, 0);
				neigongPlayCount++;
				return
			}
		}
		for (var i = 1; i <= 8; i++) {
			if (g_obj_map.get("skill_button" + i) != undefined
					&& ansi_up.ansi_to_text(g_obj_map.get("skill_button" + i)
							.get("name")) == zixueneigong) {
				clickButton("playskill " + i, 0);
				neigongPlayCount++;
				hasZixueSkill = 1;
				return true
			}
		}
		for (var i = 1; i <= 8; i++) {
			if (g_obj_map.get("skill_button" + i) != undefined
					&& $.inArray(ansi_up.ansi_to_text(g_obj_map.get(
							"skill_button" + i).get("name")), neigong) > -1) {
				clickButton("playskill " + i, 0);
				neigongPlayCount++;
				return
			}
		}
	} else {
		if (kee / max_kee < 0.5) {
			if (gSocketMsg.get_xdz() < 3) {
				return
			}
			var zixueneigong = "紫血大法";
			for (var i = 1; i <= 8; i++) {
				if (g_obj_map.get("skill_button" + i) != undefined
						&& ansi_up.ansi_to_text(g_obj_map.get(
								"skill_button" + i).get("name")) == zixueneigong) {
					clickButton("playskill " + i, 0);
					hasZixueSkill = 1;
					return
				}
			}
		}
	}
	if ((force / max_force < 0.222 && (kee / max_kee > 0.8 || neigongPlayCount >= 3))
			|| force <= enforce * 5) {
		for (var i = 1; i <= 8; i++) {
			if (g_obj_map.containsKey("skill_button" + i)
					&& ansi_up.ansi_to_text(g_obj_map.get("skill_button" + i)
							.get("name")) == "不动明王诀") {
				clickButton("playskill " + i, 0);
				hasBuDongSkill = 1;
				if (kee / max_kee <= 0.8 && force > 0 && neigongPlayCount < 3) {
					neigongPlayCount++
				}
				return
			}
		}
		if (hasBuDongSkill == -1) {
			hasBuDongSkill = 0
		}
	}
	if (gSocketMsg.get_xdz() < 3) {
		return
	}
	var jianghu = [ "飞刀绝技", "孔雀翎", "雪饮狂刀", "翻云刀法", "九天龙吟剑法", "覆雨剑法", "织冰剑法",
			"排云掌法", "如来神掌", "辉月杖法", "玄天杖法", "千影百伤棍", "破军棍诀", "拈花解语鞭", "十怒绞龙索",
			"燎原百破", "九溪断月枪", "四海断潮斩", "昊云破周斧", "玄胤天雷", "天火飞锤" ];
	for (var i = 1; i <= 8; i++) {
		if (g_obj_map.get("skill_button" + i) != undefined
				&& $.inArray(ansi_up.ansi_to_text(g_obj_map.get(
						"skill_button" + i).get("name")), jianghu) > -1) {
			clickButton("playskill " + i, 0);
			return
		}
	}
	clickButton("playskill 1", 0)
}
function autoKill() {
	setTimeout(function() {
		if (healtriger == 1) {
			return
		}
		if (g_gmain.is_fighting) {
			if (!bangfuTimer) {
				setTimeout(autoSkill, 500);
				bangfuTimer = setInterval(autoSkill, 1000)
			}
			return
		}
		var npclist = g_obj_map.get("msg_room");
		if (npclist != undefined && npclist.get("npc1") != undefined
				&& npclist.get("npc1").split(",")[1].match("符兵") == null) {
			clickButton("kill " + npclist.get("npc1").split(",")[0], 0);
			bangfuKilling = true
		}
	}, 200)
}
var is_using_drug = false;
function autoDrug() {
	if (g_gmain.is_fighting) {
		return
	}
	is_using_drug = true;
	clickButton("score");
	clickButton("prev");
	clickButton("golook_room");
	function eatDrug() {
		if (g_gmain.is_fighting) {
			return
		}
		var max_force = +g_obj_map.get("msg_attrs").get("max_force");
		if (max_force >= 60000) {
			var max = Math.floor((max_force - +g_obj_map.get("msg_attrs").get(
					"force")) / 30000);
			var inittime = 1;
			for (var i = 0; i < max; i++) {
				clickButton("items use snow_wannianlingzhi")
			}
		} else {
			var max = Math.floor((max_force - +g_obj_map.get("msg_attrs").get(
					"force")) / 5000);
			var inittime = 1;
			for (var i = 0; i < max; i++) {
				clickButton("items use snow_qiannianlingzhi")
			}
		}
		setTimeout(function() {
			is_using_drug = false
		}, inittime + i * 150)
	}
	setTimeout(eatDrug, 500)
}
var bangfu = new bangfuDo;
var qiecuoButton = document.createElement("button");
qiecuoButton.innerText = "切磋NPC";
right0ButtonArray.push(qiecuoButton);
qiecuoButton.addEventListener("click", qiecuoFunc);
var qiecuoTrigger = 0;
var qiecuoTimer = null;
function qiecuoFunc() {
	if (qiecuoTrigger == 0) {
		qiecuoButton.innerText = "停止切磋";
		qiecuoTrigger = 1;
		clearInterval(qiecuoTimer);
		qiecuoTimer = setInterval(autoLoopFight, 4000)
	} else {
		if (qiecuoTrigger == 1) {
			qiecuoButton.innerText = "切磋NPC";
			qiecuoTrigger = 0;
			clearInterval(qiecuoTimer)
		}
	}
}
function autoLoopFight() {
	if (g_obj_map.get("msg_npc") != undefined) {
		clickButton("fight " + g_obj_map.get("msg_npc").get("id"), 0)
	}
}
var qiecuoUserButton = document.createElement("button");
qiecuoUserButton.innerText = "切磋玩家";
right0ButtonArray.push(qiecuoUserButton);
qiecuoUserButton.addEventListener("click", qiecuoUserFunc);
var qiecuoUserTrigger = 0;
var qiecuoUserTimer = null;
function qiecuoUserFunc() {
	if (qiecuoUserTrigger == 0) {
		qiecuoUserButton.innerText = "停止切磋";
		qiecuoUserTrigger = 1;
		clearInterval(qiecuoUserTimer);
		qiecuoUserTimer = setInterval(autoFightUser, 1000)
	} else {
		if (qiecuoUserTrigger == 1) {
			qiecuoUserButton.innerText = "切磋玩家";
			qiecuoUserTrigger = 0;
			clearInterval(qiecuoUserTimer)
		}
	}
}
function autoFightUser() {
	if (g_obj_map.get("msg_user") != undefined) {
		clickButton("fight " + g_obj_map.get("msg_user").get("id"), 0)
	}
}
var mijingButton = document.createElement("button");
mijingButton.innerText = "秘境最优化";
mijingButton.isKuafu = false;
left0ButtonArray.push(mijingButton);
mijingButton.addEventListener("click", mijingFunc);
var mijingTrigger = 0;
function mijingFunc() {
	var roominfor = g_obj_map.get("msg_room").get("map_id");
	var mijingid = [ "tianlongshan", "dafuchuan", "fomenshiku", "dilongling",
			"luanshishan", "lvzhou", "taohuadu", "daojiangu", "binhaigucheng",
			"baguamen", "lvshuige", "langhuanyudong", "fengduguicheng" ];
	if (mijingid.indexOf(roominfor) == -1) {
		g_gmain.notify_fail(HIR + "当前秘境不支持优化。" + NOR);
		return
	} else {
		clickButton(roominfor + "_saodang", 0);
		setTimeout(function() {
			startOptimize(roominfor)
		}, 500)
	}
}
function startOptimize(roominfor) {
	var promt = g_obj_map.get("msg_prompt");
	console.log(roominfor);
	if (roominfor == "langhuanyudong") {
		overrideclick("go northwest");
		overrideclick("event_1_92817399");
		overrideclick("go west");
		overrideclick("event_1_91110342");
		overrideclick("go south");
		overrideclick("event_1_74276536");
		overrideclick("go southeast");
		overrideclick("event_1_14726005");
		overrideclick("go southwest");
		overrideclick("event_1_66980486");
		overrideclick("go northwest");
		overrideclick("event_1_39972900");
		overrideclick("go northwest");
		overrideclick("event_1_61689122");
		overrideclick("go west");
		overrideclick("event_1_19336706");
		overrideclick("go south");
		overrideclick("event_1_30457951");
		overrideclick("go southwest");
		overrideclick("event_1_96023188");
		overrideclick("go south");
		return
	}
	if (promt == undefined) {
		setTimeout(function() {
			startOptimize(roominfor)
		}, 500)
	} else {
		var msg = promt.get("msg");
		var zhuguo = parseInt(msg.split("朱果")[1].split("。")[0].split("x")[1]);
		if (zhuguo == 0) {
			alert("当前扫荡出错了。");
			return
		} else {
			console.log("目前朱果为:" + zhuguo);
			if (roominfor == "daojiangu") {
				if (zhuguo >= 1535) {
					clickButton(roominfor + "_saodang go", 0)
				} else {
					clickButton(roominfor + "_saodang", 0);
					setTimeout(function() {
						startOptimize(roominfor)
					}, 500)
				}
			} else {
				if (roominfor == "taohuadu") {
					if (zhuguo >= 1785) {
						clickButton(roominfor + "_saodang go", 0)
					} else {
						clickButton(roominfor + "_saodang", 0);
						setTimeout(function() {
							startOptimize(roominfor)
						}, 500)
					}
				} else {
					if (roominfor == "lvshuige") {
						if (zhuguo >= 1255) {
							clickButton(roominfor + "_saodang go", 0)
						} else {
							clickButton(roominfor + "_saodang", 0);
							setTimeout(function() {
								startOptimize(roominfor)
							}, 500)
						}
					} else {
						if (roominfor == "lvzhou") {
							if (zhuguo >= 2035) {
								clickButton(roominfor + "_saodang go", 0)
							} else {
								clickButton(roominfor + "_saodang", 0);
								setTimeout(function() {
									startOptimize(roominfor)
								}, 500)
							}
						} else {
							if (roominfor == "luanshishan") {
								if (zhuguo >= 2350) {
									clickButton(roominfor + "_saodang go", 0)
								} else {
									clickButton(roominfor + "_saodang", 0);
									setTimeout(function() {
										startOptimize(roominfor)
									}, 500)
								}
							} else {
								if (roominfor == "dilongling") {
									if (zhuguo >= 2385) {
										clickButton(roominfor + "_saodang go",
												0)
									} else {
										clickButton(roominfor + "_saodang", 0);
										setTimeout(function() {
											startOptimize(roominfor)
										}, 500)
									}
								} else {
									if (roominfor == "fomenshiku") {
										if (zhuguo >= 2425) {
											clickButton(roominfor
													+ "_saodang go", 0)
										} else {
											clickButton(roominfor + "_saodang",
													0);
											setTimeout(function() {
												startOptimize(roominfor)
											}, 500)
										}
									} else {
										if (roominfor == "dafuchuan") {
											if (zhuguo >= 3090) {
												clickButton(roominfor
														+ "_saodang go", 0)
											} else {
												clickButton(roominfor
														+ "_saodang", 0);
												setTimeout(function() {
													startOptimize(roominfor)
												}, 500)
											}
										} else {
											if (roominfor == "tianlongshan") {
												if (zhuguo >= 3100) {
													clickButton(roominfor
															+ "_saodang go", 0)
												} else {
													clickButton(roominfor
															+ "_saodang", 0);
													setTimeout(
															function() {
																startOptimize(roominfor)
															}, 500)
												}
											} else {
												if (roominfor == "binhaigucheng") {
													if (zhuguo >= 3385) {
														clickButton(
																roominfor
																		+ "_saodang go",
																0)
													} else {
														clickButton(roominfor
																+ "_saodang", 0);
														setTimeout(
																function() {
																	startOptimize(roominfor)
																}, 500)
													}
												} else {
													if (roominfor == "baguamen") {
														if (zhuguo >= 3635) {
															clickButton(
																	roominfor
																			+ "_saodang go",
																	0)
														} else {
															clickButton(
																	roominfor
																			+ "_saodang",
																	0);
															setTimeout(
																	function() {
																		startOptimize(roominfor)
																	}, 500)
														}
													} else {
														if (roominfor == "fengduguicheng") {
															if (zhuguo >= 3890) {
																clickButton(
																		roominfor
																				+ "_saodang go",
																		0)
															} else {
																clickButton(
																		roominfor
																				+ "_saodang",
																		0);
																setTimeout(
																		function() {
																			startOptimize(roominfor)
																		}, 500)
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
function mijingProtection() {
	if (g_obj_map.get("msg_room") == undefined
			|| g_obj_map.get("msg_room").get("map_id") == undefined) {
		return true
	}
	send("look_room\n");
	var roominfor = g_obj_map.get("msg_room").get("map_id");
	var mijingid = [ "tianlongshan", "dafuchuan", "fomenshiku", "dilongling",
			"luanshishan", "lvzhou", "taohuadu", "daojiangu", "binhaigucheng",
			"baguamen", "lvshuige", "langhuanyudong" ];
	if (mijingid.indexOf(roominfor) > -1) {
		g_gmain.notify_fail(HIR + "又手抖了？该戒撸了！！！" + NOR);
		return false
	}
	return true
}
var XiaohaoCheckButton = document.createElement("button");
XiaohaoCheckButton.innerText = "小号签到";
XiaohaoCheckButton.isKuafu = false;
left0ButtonArray.push(XiaohaoCheckButton);
var xiaohaocheck = new XiaohaoCheck();
XiaohaoCheckButton.addEventListener("click", xiaohaocheck.show);
setTimeout(function() {
	xiaohaocheck.autodocheck()
}, 1000);
function XiaohaoCheck() {
	var buttonList = [];
	var localstrorageKey = "xiaohaolistKeyName";
	var ischeckingKey = "xiaohaolistCheckingKeyName";
	var buttonsShow = false;
	var startcheck = function() {
		if (window.localStorage[ischeckingKey]) {
			window.localStorage[ischeckingKey] = ""
		} else {
			window.localStorage[ischeckingKey] = "1";
			gocheck()
		}
	};
	var gocheck = function() {
		if (!g_obj_map || !g_obj_map.get("msg_attrs")) {
			setTimeout(gocheck, 500);
			return
		}
		var xiaohaolist = getxiaohaolist();
		if (xiaohaolist && xiaohaolist[g_obj_map.get("msg_attrs").get("id")]) {
			overrideclick("share_ok 1");
			overrideclick("share_ok 2");
			overrideclick("share_ok 3");
			overrideclick("share_ok 4");
			overrideclick("share_ok 5");
			overrideclick("share_ok 7");
			overrideclick("exercise stop");
			overrideclick("exercise");
			go("event_1_37505221");
			overrideclick("clan");
			overrideclick("jh 1");
			overrideclick("look_npc snow_mercenary");
			checkPersonLibao(
					"snow_mercenary",
					function() {
						overrideclick("look_npc snow_zhounianxiaoer");
						checkPersonLibao(
								"snow_zhounianxiaoer",
								function() {
									overrideclick("jh 5");
									overrideclick("go north");
									overrideclick("go north");
									overrideclick("go north");
									overrideclick("go west");
									overrideclick("sign7");
									go("e;s;e;look_npc yangzhou_yangzhou9");
									checkPersonLibao(
											"yangzhou_yangzhou9",
											function() {
												overrideclick("jh 2");
												overrideclick("go north");
												overrideclick("go north");
												overrideclick("go north");
												overrideclick("go north");
												overrideclick("go north");
												overrideclick("go north");
												overrideclick("go north");
												overrideclick("go east");
												overrideclick("tzjh_lq");
												var yuanbao = +g_obj_map.get(
														"msg_attrs").get(
														"yuanbao");
												if (yuanbao >= 100000) {
													overrideclick("touzi_jihua2 buygo go6")
												} else {
													if (yuanbao >= 50000) {
														overrideclick("touzi_jihua2 buygo go5")
													} else {
														if (yuanbao >= 30000) {
															overrideclick("touzi_jihua2 buygo go4")
														} else {
															if (yuanbao >= 20000) {
																overrideclick("touzi_jihua2 buygo go3")
															} else {
																if (yuanbao >= 10000) {
																	overrideclick("touzi_jihua2 buygo go2")
																} else {
																	if (yuanbao >= 2000) {
																		overrideclick("touzi_jihua2 buygo go1")
																	}
																}
															}
														}
													}
												}
												overrideclick("tzjh_lq");
												go("w;look_npc luoyang_luoyang3");
												checkPersonLibao(
														"luoyang_luoyang3",
														function() {
															if (g_obj_map
																	.containsKey("msg_clan_view")) {
																for (var i = 0; i < 20; i++) {
																	go("clan incense yx");
																	go("clan incense jx")
																}
																for (var i = 0; i < 5; i++) {
																	go("clan incense cx");
																	go("clan buy 302")
																}
																go("clan fb go_saodang daxuemangongdao");
																go("clan fb go_saodang shenshousenlin")
															}
															go("home");
															xiaohaolist[g_obj_map
																	.get(
																			"msg_attrs")
																	.get("id")].lasttime = new Date()
																	.getTime();
															window.localStorage[localstrorageKey] = JSON
																	.stringify(xiaohaolist);
															var waitfornext = function() {
																if (!hasGoToEnd()) {
																	setTimeout(
																			waitfornext,
																			500)
																} else {
																	gonext()
																}
															};
															waitfornext()
														})
											})
								})
					})
		}
	};
	var gonext = function() {
		var xiaohaolist = getxiaohaolist();
		var now = new Date();
		var today = new Date();
		today.setHours(6, 0, 0, 0);
		var nowtime = now.getTime();
		var today6diantime = today.getTime();
		var finished = false;
		for ( var hao in xiaohaolist) {
			var lasttime = +xiaohaolist[hao].lasttime;
			if (now > today6diantime) {
				finished = lasttime >= today6diantime
			} else {
				finished = lasttime > today6diantime - 86400000
			}
			if (!finished) {
				window.location = xiaohaolist[hao].href;
				break
			}
		}
		if (finished) {
			window.localStorage[ischeckingKey] = ""
		}
	};
	var getxiaohaolist = function() {
		if (window.localStorage[localstrorageKey]) {
			var xiaohaolist = JSON.parse(window.localStorage[localstrorageKey]);
			if (xiaohaolist) {
				return xiaohaolist
			}
		}
		return {}
	};
	var addxiaohao = function() {
		var xiaohaolist = getxiaohaolist();
		xiaohaolist[g_obj_map.get("msg_attrs").get("id")] = {
			href : window.location.href,
			lasttime : 0
		};
		window.localStorage[localstrorageKey] = JSON.stringify(xiaohaolist);
		g_gmain.notify_fail(HIG + "添加成功" + NOR)
	};
	var deletexiaohao = function() {
		var xiaohaolist = getxiaohaolist();
		delete xiaohaolist[g_obj_map.get("msg_attrs").get("id")];
		window.localStorage[localstrorageKey] = JSON.stringify(xiaohaolist);
		g_gmain.notify_fail(HIG + "删除成功" + NOR)
	};
	var init = function() {
		if (!window.xiaohaocheckinit) {
			var addButton = document.createElement("button");
			addButton.innerText = "删除当前小号";
			addButton.addEventListener("click", deletexiaohao);
			buttonList.push(addButton);
			var addButton = document.createElement("button");
			addButton.innerText = "添加当前小号";
			addButton.addEventListener("click", addxiaohao);
			buttonList.push(addButton);
			var startButton = document.createElement("button");
			startButton.innerText = "开始签到";
			if (window.localStorage[ischeckingKey]) {
				startButton.innerText = "停止签到"
			}
			startButton.addEventListener("click", startcheck);
			buttonList.push(startButton);
			initButtons(buttonList, 2, 30);
			window.xiaohaocheckinit = true
		}
	};
	var show = function() {
		init();
		if (buttonsShow) {
			hideButton(buttonList)
		} else {
			showButton(buttonList)
		}
		buttonsShow = !buttonsShow
	};
	var autodocheck = function() {
		if (window.localStorage[ischeckingKey]) {
			gocheck()
		}
	};
	return {
		show : show,
		autodocheck : autodocheck
	}
}
function checkPersonLibao(npcid, callback) {
	if (!g_obj_map) {
		setTimeout(function() {
			checkPersonLibao(npcid, callback)
		}, 500);
		return
	}
	var npc = g_obj_map.get("msg_npc");
	if (npc == undefined) {
		setTimeout(function() {
			checkPersonLibao(npcid, callback)
		}, 500)
	} else {
		if (npc.get("id") != npcid) {
			setTimeout(function() {
				checkPersonLibao(npcid, callback)
			}, 500)
		} else {
			for (var i = 1; i < npc.size(); i++) {
				if (npc.get("cmd" + i + "_name") == undefined) {
					break
				}
				if (npc.get("cmd" + i + "_name").match("礼包") != null
						&& npc.get("cmd" + i + "_name").match("1元") == null
						&& npc.get("cmd" + i + "_name").match("兑换") == null) {
					overrideclick(npc.get("cmd" + i))
				}
			}
			if (callback) {
				callback()
			}
		}
	}
}
function checkPersonLibaos(npcids, callback) {
	if (npcids.length > 0) {
		var npcid = npcids.pop();
		go("look_npc " + npcid);
		checkPersonLibao(npcid, function() {
			checkPersonLibaos(npcids, callback)
		})
	} else {
		if (callback) {
			callback()
		}
	}
}
var CheckInButton = document.createElement("button");
CheckInButton.innerText = "签到系列";
CheckInButton.isKuafu = false;
left0ButtonArray.push(CheckInButton);
CheckInButton.addEventListener("click", CheckIn);
var left1ButtonsVisible = false;
function CheckIn() {
	if (left1ButtonsVisible) {
		hideButton(left1ButtonArray)
	} else {
		showButton(left1ButtonArray)
	}
	left1ButtonsVisible = !left1ButtonsVisible
}
function SetClickTime(key) {
	key = key + "_" + g_obj_map.get("msg_attrs").get("id");
	window.localStorage.setItem(key, new Date().getTime());
	console.log(window.localStorage[key])
}
function TodayHasClicked(key) {
	key = key + "_" + g_obj_map.get("msg_attrs").get("id");
	if (window.localStorage && window.localStorage[key]) {
		console.log(window.localStorage[key]);
		var lasttime = +window.localStorage[key];
		var now = new Date();
		var today = new Date();
		today.setHours(6, 0, 0, 0);
		var nowtime = now.getTime();
		var today6diantime = today.getTime();
		if (now > today6diantime) {
			return lasttime >= today6diantime
		} else {
			return lasttime > today6diantime - 86400000
		}
	} else {
		return false
	}
	return false
}
var DaTongRen2Button = document.createElement("button");
DaTongRen2Button.innerText = "打铜人2";
left1ButtonArray.push(DaTongRen2Button);
DaTongRen2Button.addEventListener("click", function() {
	DaTongRen(2)
});
var DaTongRenButton = document.createElement("button");
DaTongRenButton.innerText = "打铜人1";
left1ButtonArray.push(DaTongRenButton);
DaTongRenButton.addEventListener("click", function() {
	DaTongRen(1)
});
function DaTongRen(tongren) {
	if (!mijingProtection()) {
		return
	}
	SetClickTime("打铜人" + tongren);
	go("score;enable");
	setTimeout(function() {
		DaTongRenSwitch(tongren)
	}, 1000)
}
function DaTongRenSwitch(tongren) {
	if (!g_obj_map.get("msg_score")) {
		setTimeout(function() {
			DaTongRenSwitch(tongren)
		}, 500);
		return
	}
	if (+g_obj_map.get("msg_score").get("reduce2").replace("%", "") >= 60) {
		FastDaTongRen(tongren)
	} else {
		DoDaTongRen(tongren)
	}
}
function DoDaTongRen(tongren) {
	if (!g_obj_map.get("msg_enables")) {
		setTimeout(function() {
			DoDaTongRen(tongren)
		}, 500);
		return
	}
	var zhunbei = [];
	var beitai = [];
	var enable_types = [ "unarmed", "sword", "" ];
	var enables = g_obj_map.get("msg_enables");
	for (var i = 1; i <= 12; i++) {
		for (var j = 1; j <= 2; j++) {
			var key = "skill" + i + "_map" + j;
			if (enables.get(key)) {
				var skill = enables.get(key);
				zhunbei.push({
					"i" : i,
					"j" : j,
					"id" : skill,
					"sel" : enables.get(key + "_sel") == "1",
					"type" : enables.get("skill" + i)
				})
			}
			var beitaikey = "skill" + i + "_can_map" + j;
			if (enables.get(beitaikey)) {
				var skill = enables.get(beitaikey);
				beitai.push({
					"i" : i,
					"j" : j,
					"id" : skill,
					"type" : enables.get("skill" + i)
				})
			}
		}
	}
	var cmds = [];
	cmds.push("enable unmap_all");
	cmds.push("delay");
	for (var i = 0; i < beitai.length; i++) {
		if (beitai[i].j == 1) {
			cmds.push("enableskill enable " + beitai[i].type + " "
					+ beitai[i].id)
		}
	}
	for (var i = 0; i < zhunbei.length; i++) {
		if (zhunbei[i].sel) {
			cmds.push("enableskill enable " + zhunbei[i].type + " "
					+ zhunbei[i].id);
			cmds.push("enableskill enable " + zhunbei[i].id + " attack_select");
			for (var j = 0; j < beitai.length; j++) {
				if (beitai[j].i == zhunbei[i].i && beitai[j].j == 2) {
					cmds.push("enableskill enable " + beitai[j].type + " "
							+ beitai[j].id)
				}
			}
		}
	}
	window.singleBattleTrigger = 1;
	window.singleBattleInstance = new window.singleBattle(function() {
		go("home;exercise")
	});
	cmds.push("auto_equip off");
	if (tongren == 1) {
		cmds.push("clan zsdg enter;n;n;n;n;n;event_1_14757697")
	} else {
		cmds.push("clan zsdg enter;n;n;n;e;e;e;e;e;e;e;e;n;n;event_1_35095441")
	}
	cmds.push("auto_equip on");
	cmds.push("enable unmap_all");
	cmds.push("delay");
	for (var i = 0; i < zhunbei.length; i++) {
		cmds
				.push("enableskill enable " + zhunbei[i].type + " "
						+ zhunbei[i].id);
		if (zhunbei[i].sel) {
			cmds.push("enableskill enable " + zhunbei[i].id + " attack_select")
		}
	}
	cmds.push("look_room");
	cmds.push("exercise");
	GoSlowAction(cmds)
}
function FastDaTongRen(tongren) {
	window.singleBattleTrigger = 1;
	window.singleBattleInstance = new window.singleBattle(function() {
		go("home")
	});
	if (tongren == 1) {
		go("clan zsdg enter;n;n;n;n;n;event_1_14757697")
	} else {
		go("clan zsdg enter;n;n;n;e;e;e;e;e;e;e;e;n;n;event_1_35095441")
	}
}
function GoSlowAction(cmds) {
	if (cmds.length <= 0) {
		return
	}
	if (!hasGoToEnd()) {
		setTimeout(function() {
			GoSlowAction(cmds)
		}, 200);
		return
	}
	var cmd = cmds.shift();
	if (cmd == "delay") {
		setTimeout(function() {
			GoSlowAction(cmds)
		}, 400);
		return
	}
	go(cmd);
	setTimeout(function() {
		GoSlowAction(cmds)
	}, 400)
}
var MiaojianglianyaoButton = document.createElement("button");
MiaojianglianyaoButton.innerText = "炼药";
left1ButtonArray.push(MiaojianglianyaoButton);
MiaojianglianyaoButton.addEventListener("click", Miaojianglianyao);
function Miaojianglianyao() {
	if (!mijingProtection()) {
		return
	}
	SetClickTime("炼药");
	GoToCanglangjiang()
}
function GoToCanglangjiang() {
	go("jh 40;s;s;s;s;e;s;se;sw;s;sw;e;e;sw;se;sw;se;event_1_8004914");
	GoToLianyaoshi()
}
function GoToLianyaoshi() {
	if (!hasGoToEnd()) {
		setTimeout(GoToLianyaoshi, 1000);
		return
	}
	if (g_obj_map.get("msg_room").get("short") != "澜沧江南岸") {
		GoToCanglangjiang()
	} else {
		go("se;s;s;e;n;n;e;s;e;ne;s;sw;e;e;ne;ne;nw;ne;ne;n;n;w;lianyao");
		DoLianyao()
	}
}
function DoLianyao() {
	if (!hasGoToEnd()) {
		setTimeout(DoLianyao, 1000);
		return
	}
	setTimeout(LianYaoIt, 5900)
}
function LianYaoIt() {
	if ($("span:contains(炼药需要毒琥珀和毒藤胶，你还没有)").length > 0) {
		go("shop money_buy mny_shop9_N_10;shop money_buy mny_shop10_N_10;lianyao");
		$("span:contains(炼药需要毒琥珀和毒藤胶，你还没有)").text("炼药需要毒琥珀和毒藤胶，刚买了10组");
		setTimeout(LianYaoIt, 6000)
	} else {
		if ($("span:contains(炼药的丹炉已经是滚得发烫)").length > 0) {
			clickButton("home")
		} else {
			clickButton("lianyao");
			setTimeout(LianYaoIt, 6000)
		}
	}
}
var answerQuestionButton = document.createElement("button");
answerQuestionButton.innerText = "自动答题";
left1ButtonArray.push(answerQuestionButton);
answerQuestionButton.addEventListener("click", answerQuestionFunc);
var answerTrigger = 0;
function answerQuestionFunc() {
	SetClickTime("自动答题");
	if (answerTrigger == 0) {
		answerTrigger = 1;
		overrideclick("look_room");
		clickButton("question", 0)
	} else {
		answerTrigger = 0
	}
}
var tiexueButton = document.createElement("button");
tiexueButton.innerText = "破障除魔";
left1ButtonArray.push(tiexueButton);
tiexueButton.addEventListener("click", tiexueFunc);
function tiexueFunc() {
	SetClickTime("破障除魔");
	go("jh 31;n;se;e;se;s;s;sw;se;se;e;nw;e;ne;n;ne;n;n;n;n;n;n;n;n;n;e;e;event_1_94442590;event_1_85535721")
}
var TianShanDaZuoButton = document.createElement("button");
TianShanDaZuoButton.innerText = "天山打坐";
left1ButtonArray.push(TianShanDaZuoButton);
TianShanDaZuoButton.addEventListener("click", TianShanDaZuo);
function TianShanDaZuo() {
	if (!mijingProtection()) {
		return
	}
	SetClickTime("天山打坐");
	overrideclick("jh");
	if (g_obj_map.get("msg_jh_list") == undefined) {
		setTimeout(function() {
			TianShanDaZuo()
		}, 500)
	} else {
		go("items");
		setTimeout(function() {
			gocloth()
		}, 500)
	}
}
function gocloth() {
	if (!g_obj_map.get("msg_items")) {
		setTimeout(function() {
			gocloth()
		}, 200);
		return
	}
	var hasCloth = false;
	$(g_obj_map.get("msg_items").elements).each(
			function(i, ele) {
				if (ele.key.indexOf("items") > -1
						&& ele.value.indexOf("yuhanyi,") == 0) {
					hasCloth = true
				}
			});
	if (!hasCloth) {
		go("jh 1;e;n;n;w;event_1_24319712")
	}
	gogetshouyu()
}
function gogetshouyu() {
	var jhlist = g_obj_map.get("msg_jh_list").get("finish16");
	var hasShouyu = false;
	$(g_obj_map.get("msg_items").elements).each(
			function(i, ele) {
				if (ele.key.indexOf("items") > -1
						&& ele.value.indexOf("tianshan_zmsy,") == 0) {
					hasShouyu = true
				}
			});
	if (jhlist != undefined && jhlist != 0) {
		if (!hasShouyu) {
			window.singleBattleTrigger = 1;
			window.singleBattleInstance = new window.singleBattle(function() {
				goTianshan()
			});
			go("jh 16;s;s;s;s;e;n;e;event_1_5221690;s;w;event_1_57688376;n;n;e;n;event_1_88625473;event_1_82116250;event_1_90680562;event_1_38586637;fight xiaoyao_tonglao");
			g_gmain.notify_fail(HIG + "掌门手谕" + NOR)
		} else {
			goTianshan()
		}
	}
}
function goTianshan() {
	go("jh 39;ne;e;n;ne;ne;n;ne;nw;event_1_58460791");
	tianshanPanshanshen()
}
function tianshanPanshanshen() {
	if (g_obj_map.get("msg_room") == undefined) {
		setTimeout(function() {
			tianshanPanshanshen()
		}, 200)
	} else {
		if (cmdlist.length == 0) {
			if (g_obj_map.get("msg_room").get("short") == "雪谷") {
				go("se;s;e;n;ne;nw;event_1_58460791");
				setTimeout(function() {
					tianshanPanshanshen()
				}, 500)
			} else {
				if (g_obj_map.get("msg_room").get("short") == "失足岩") {
					go("nw;n;ne;nw;nw;w;n;n;n;e;e;s;give tianshan_hgdz;ask tianshan_hgdz;ask tianshan_hgdz;s;event_1_34855843")
				}
			}
		} else {
			setTimeout(function() {
				tianshanPanshanshen()
			}, 500)
		}
	}
}
var DaZhaoBiHuaButton = document.createElement("button");
DaZhaoBiHuaButton.innerText = "大招壁画";
left1ButtonArray.push(DaZhaoBiHuaButton);
DaZhaoBiHuaButton.addEventListener("click", DaZhaoBiHua);
var DaZhaoBiHuastep = 0;
function DaZhaoBiHua() {
	if (!mijingProtection()) {
		return
	}
	SetClickTime("大招壁画");
	overrideclick("jh");
	if (g_obj_map.get("msg_jh_list") == undefined) {
		setTimeout(function() {
			DaZhaoBiHua()
		}, 500)
	} else {
		go("jh 26;w;w;n;w;w;w");
		gobihua()
	}
}
var directions = [ "west", "east", "north", "south", "northwest", "northeast",
		"southwest", "southeast" ];
var bihuataopaoTrigger = 0;
function gobihua() {
	if (!g_obj_map.get("msg_room")) {
		setTimeout(function() {
			gobihua()
		}, 300)
	} else {
		if (!hasGoToEnd()) {
			setTimeout(function() {
				gobihua()
			}, 100)
		} else {
			if (g_obj_map.get("msg_room").get("short") == "阴山密林"
					|| g_obj_map.get("msg_room").get("short") == "狼山") {
				bihuataopaoTrigger = 1;
				for (var i = 0; i < directions.length; i++) {
					if (g_obj_map.get("msg_room").get(directions[i])
							&& g_obj_map.get("msg_room").get(directions[i]) == "阴山密林") {
						clickButton("go " + directions[i]);
						break
					}
				}
				setTimeout(function() {
					gobihua()
				}, 300)
			} else {
				if (g_obj_map.get("msg_room").get("short") == "阴山古刹") {
					DaZhaoBiHua()
				} else {
					if (g_obj_map.get("msg_room").get("short") == "阴山岩画") {
						bihuataopaoTrigger = 0;
						if (g_obj_map.get("msg_attrs").get("int") >= 125) {
							go("event_1_12853448;home")
						} else {
							go("wield sword of windspring;event_1_12853448;home")
						}
					} else {
						setTimeout(function() {
							gobihua()
						}, 300)
					}
				}
			}
		}
	}
}
var bihuataopaoTimer = null;
function Bihuataopao() {
	this.dispatchMessage = function(b) {
		var type = b.get("type"), subType = b.get("subtype");
		if (type == "vs" && subType == "vs_info") {
			Bihuataopaoescapeloop();
			clearInterval(bihuataopaoTimer);
			setTimeout(autoSkill, 500);
			bihuataopaoTimer = setInterval(autoSkill, 1000)
		} else {
			if (type == "vs" && subType == "combat_result") {
				clearInterval(bihuataopaoTimer);
				DaZhaoBiHua()
			}
		}
	}
}
function Bihuataopaoescapeloop() {
	clickButton("escape", 0);
	if (is_fighting == 0 || g_gmain.g_delay_connect > 0) {
		clearInterval(bihuataopaoTimer);
		return
	}
	if (bihuataopaoTrigger == 1) {
		setTimeout(function() {
			Bihuataopaoescapeloop()
		}, 500)
	}
}
var bihuataopao = new Bihuataopao();
var BingYueGuButton = document.createElement("button");
BingYueGuButton.innerText = "自动冰月";
left1ButtonArray.push(BingYueGuButton);
BingYueGuButton.addEventListener("click", BingYueGu);
function BingYueGu() {
	if (!mijingProtection()) {
		return
	}
	SetClickTime("自动冰月");
	window.singleBattleTrigger = 1;
	window.singleBattleInstance = new window.singleBattle(function() {
		window.singleBattleTrigger = 1;
		window.singleBattleInstance = new window.singleBattle(function() {
			window.singleBattleTrigger = 1;
			window.singleBattleInstance = new window.singleBattle(function() {
				window.singleBattleTrigger = 1;
				window.singleBattleInstance = new window.singleBattle();
				go("s;kill bingyuegu_bingyuexianren")
			});
			go("event_1_17623983;event_1_6670148;kill bingyuegu_hundunyaoling")
		});
		go("event_1_55319823;kill bingyuegu_xuanwujiguanshou")
	});
	go("jh 14;w;n;n;n;n;event_1_32682066;event_1_35756630;kill bingyuegu_yueyihan")
}
var BenliugaotuButton = document.createElement("button");
BenliugaotuButton.innerText = "本六高突";
left1ButtonArray.push(BenliugaotuButton);
BenliugaotuButton.addEventListener("click", Benliugaotu);
function Benliugaotu() {
	if (!mijingProtection()) {
		return
	}
	SetClickTime("本六高突");
	if (g_obj_map.get("msg_attrs").get("int") >= 130) {
		go("team create;fb 6;event_1_8221898;kill changleweiyang_taishuling")
	} else {
		go("wield sword of windspring;wear longyuan banzhi moke;team create;fb 6;event_1_8221898;auto_equip on;kill changleweiyang_taishuling")
	}
	window.singleBattleTrigger = 1;
	window.singleBattleInstance = new window.singleBattle(
			function() {
				go("home");
				go("team create;fb 6;event_1_94101353;kill changleweiyang_huagmencheng");
				window.singleBattleTrigger = 1;
				window.singleBattleInstance = new window.singleBattle(
						function() {
							go("home");
							go("team create;fb 6;event_1_18437151;kill changleweiyang_zhijinwu");
							window.singleBattleTrigger = 1;
							window.singleBattleInstance = new window.singleBattle(
									function() {
										go("home");
										go("team create;fb 6;event_1_74386803;kill changleweiyang_wunvling");
										window.singleBattleTrigger = 1;
										window.singleBattleInstance = new window.singleBattle(
												function() {
													go("home")
												})
									})
						})
			})
}
var CheckIn4Button = document.createElement("button");
CheckIn4Button.innerText = "日常潜能";
left1ButtonArray.push(CheckIn4Button);
CheckIn4Button.addEventListener("click", CheckIn4);
function CheckIn4() {
	if (!mijingProtection()) {
		return
	}
	SetClickTime("日常潜能");
	g_gmain.notify_fail(HIG + "开始领取日常潜能" + NOR);
	go("jh");
	setTimeout(function() {
		weieyu()
	}, 300)
}
var CheckIn3Button = document.createElement("button");
CheckIn3Button.innerText = "武馆签到";
left1ButtonArray.push(CheckIn3Button);
CheckIn3Button.addEventListener("click", CheckIn3);
function CheckIn3() {
	if (!mijingProtection()) {
		return
	}
	SetClickTime("武馆签到");
	g_gmain.notify_fail(HIG + "开始武馆签到" + NOR);
	overrideclick("jh 1");
	overrideclick("go east");
	overrideclick("go north");
	overrideclick("go east");
	overrideclick("go east");
	overrideclick("event_1_44731074");
	overrideclick("event_1_8041045");
	overrideclick("event_1_8041045");
	overrideclick("event_1_29721519");
	overrideclick("event_1_60133236");
	overrideclick("home")
}
var CheckIn2Button = document.createElement("button");
CheckIn2Button.innerText = "扬州签到";
left1ButtonArray.push(CheckIn2Button);
CheckIn2Button.addEventListener("click", CheckIn2);
function CheckIn2() {
	if (!mijingProtection()) {
		return
	}
	SetClickTime("扬州签到");
	g_gmain.notify_fail(HIG + "开始扬州签到" + NOR);
	overrideclick("jh 5");
	overrideclick("go north");
	overrideclick("go north");
	overrideclick("go north");
	overrideclick("go west");
	overrideclick("sign7");
	go("e;s;e;look_npc yangzhou_yangzhou9");
	startShuanger()
}
function startShuanger() {
	var npc = g_obj_map.get("msg_npc");
	if (npc == undefined) {
		setTimeout(startShuanger, 500)
	} else {
		if (npc.get("id") != "yangzhou_yangzhou9") {
			setTimeout(startShuanger, 500)
		} else {
			for (var i = 1; i < 10; i++) {
				console.log(npc.get("cmd" + i + "_name"));
				if (npc.get("cmd" + i + "_name") == undefined) {
					break
				}
				if (npc.get("cmd" + i + "_name").match("礼包") != null
						&& npc.get("cmd" + i + "_name").match("1元") == null
						&& npc.get("cmd" + i + "_name").match("兑换") == null) {
					overrideclick(npc.get("cmd" + i))
				}
			}
			overrideclick("home")
		}
	}
}
var CheckIn1Button = document.createElement("button");
CheckIn1Button.innerText = "逢义礼包";
left1ButtonArray.push(CheckIn1Button);
CheckIn1Button.addEventListener("click", CheckIn1);
function CheckIn1() {
	if (!mijingProtection()) {
		return
	}
	SetClickTime("逢义礼包");
	overrideclick("share_ok 1");
	overrideclick("share_ok 2");
	overrideclick("share_ok 3");
	overrideclick("share_ok 4");
	overrideclick("share_ok 5");
	overrideclick("share_ok 7");
	overrideclick("exercise stop");
	overrideclick("exercise");
	scanEscapedFish();
	overrideclick("public_op3");
	fengyi()
}
function fengyi() {
	go("jh 1;w;event_1_46497436;e");
	go("look_npc snow_zhounianxiaoer");
	checkPersonLibao("snow_zhounianxiaoer", function() {
		overrideclick("look_npc snow_mercenary");
		startFengyi()
	})
}
function startFengyi() {
	if (!g_obj_map.containsKey("msg_room")) {
		setTimeout(startFengyi, 500);
		return
	}
	var roominfo = g_obj_map.get("msg_room");
	if (roominfo.get("map_id") != "snow" || roominfo.get("obj_p") != 18) {
		setTimeout(startFengyi, 500);
		return
	}
	var npcids = [];
	for (var i = 1; i <= roominfo.elements.length; i++) {
		if (roominfo.containsKey("npc" + i)) {
			npcids.push(roominfo.get("npc" + i).split(",")[0])
		}
	}
	checkPersonLibaos(npcids, function() {
		overrideclick("jh 2");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go east");
		overrideclick("tzjh_lq");
		overrideclick("go west");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go east");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go west");
		overrideclick("event_1_31320275");
		loopGo("clan incense yx", 20);
		loopGo("clan buy 101", 10);
		loopGo("clan buy 201", 2);
		loopGo("clan buy 202", 2);
		loopGo("clan buy 301", 5);
		loopGo("clan buy 302", 5);
		loopGo("clan buy 401", 1);
		loopGo("clan buy 501", 1);
		if (g_obj_map.get("msg_attrs").get("id") == "u7609348") {
			loopGo("clan buy 703", 10);
			loopGo("clan buy 801", 1)
		}
		loopGo("items use obj_baoxianka", 2);
		overrideclick("home")
	})
}
function xiakedao1() {
	var jhlist = g_obj_map.get("msg_jh_list").get("finish36");
	if (jhlist != undefined && jhlist != 0) {
		overrideclick("jh 36");
		overrideclick("yell", 0);
		xiakedao2()
	} else {
		pozhen()
	}
}
function xiakedao2() {
	if (!g_obj_map.get("msg_room")
			|| g_obj_map.get("msg_room").get("map_id") != "xiakedao") {
		setTimeout(function() {
			xiakedao2()
		}, 500)
	} else {
		var locationname = g_obj_map.get("msg_room").get("short");
		if ((locationname == "侠客岛渡口")) {
			overrideclick("go east");
			overrideclick("go northeast");
			overrideclick("go northeast");
			overrideclick("go northeast");
			overrideclick("go east");
			overrideclick("go east");
			overrideclick("go east");
			overrideclick("event_1_9179222");
			overrideclick("go east");
			overrideclick("event_1_11720543");
			overrideclick("go west");
			overrideclick("go north");
			overrideclick("go east");
			overrideclick("go east");
			overrideclick("go south");
			overrideclick("go east");
			overrideclick("event_1_44025101");
			g_gmain.notify_fail(HIG + "看书结束，准备跳瀑布" + NOR);
			setTimeout(function() {
				xiakedao3()
			}, 500)
		} else {
			setTimeout(function() {
				xiakedao2()
			}, 500)
		}
	}
}
var curstamp = 0;
var prestamp = 0;
var cmdlist = [];
var deadlock = 0;
function overrideclick(cmd) {
	deadlock = 1;
	cmdlist.push(cmd);
	deadlock = 0
}
function newoverrideclick() {
	if (cmdlist.length == 0) {
		setTimeout(function() {
			newoverrideclick()
		}, 10)
	} else {
		if (cmdlist.length > 0 && deadlock == 1) {
			setTimeout(function() {
				newoverrideclick()
			}, 10)
		} else {
			if (deadlock == 0 && cmdlist.length > 0) {
				curstamp = (new Date()).valueOf();
				if ((curstamp - prestamp) > 150) {
					if (cmdlist.length != 0) {
						if (qiangdipiTrigger == 0) {
							if (cmdlist[0].match("get1") == null) {
								clickButton(cmdlist[0]);
								cmdlist.shift();
								prestamp = curstamp
							} else {
								cmdlist.shift();
								prestamp = curstamp
							}
						} else {
							if (qiangdipiTrigger == 1) {
								if (cmdlist[0].match("get1") == null) {
									clickButton(cmdlist[0]);
									cmdlist.shift();
									prestamp = curstamp
								} else {
									if (knownlist.indexOf(cmdlist[0]
											.split("get1")[1]) < 0
											&& cmdlist[0].split("get1")[1]
													.match("corpse") != null) {
										knownlist
												.push(cmdlist[0].split("get1")[1])
									}
									clickButton("get"
											+ cmdlist[0].split("get1")[1]);
									cmdlist.shift();
									prestamp = curstamp
								}
							}
						}
					}
					setTimeout(function() {
						newoverrideclick()
					}, 10)
				} else {
					setTimeout(function() {
						newoverrideclick()
					}, 10)
				}
			}
		}
	}
}
newoverrideclick();
function xiakedao3() {
	if (g_obj_map.get("msg_room") == undefined) {
		setTimeout(function() {
			xiakedao3()
		}, 200)
	} else {
		var locationname = g_obj_map.get("msg_room").get("short");
		console.log(locationname);
		if (locationname == "崖底" && cmdlist.length == 0) {
			overrideclick("event_1_4788477");
			overrideclick("go northwest");
			overrideclick("go west");
			overrideclick("go southwest");
			overrideclick("go west");
			overrideclick("go north");
			overrideclick("go north");
			overrideclick("go north");
			overrideclick("go west");
			overrideclick("go west");
			overrideclick("go south");
			overrideclick("go west");
			overrideclick("go northwest");
			overrideclick("go west");
			overrideclick("go east");
			overrideclick("go northeast");
			overrideclick("go northeast");
			overrideclick("go northeast");
			overrideclick("go east");
			overrideclick("go east");
			overrideclick("go east");
			overrideclick("go east");
			overrideclick("go east");
			overrideclick("go south");
			overrideclick("go east");
			overrideclick("event_1_44025101");
			console.log("跳瀑布失败，回到瀑布");
			setTimeout(function() {
				xiakedao3()
			}, 500)
		} else {
			if (locationname == "石门" && cmdlist.length == 0) {
				console.log("进入石门");
				overrideclick("event_1_36230918");
				overrideclick("go east");
				overrideclick("go east");
				overrideclick("go south");
				overrideclick("event_1_77496481");
				g_gmain.notify_fail(HIG + "侠客岛日常结束" + NOR);
				setTimeout(function() {
					pozhen()
				}, 500)
			} else {
				setTimeout(function() {
					xiakedao3()
				}, 500)
			}
		}
	}
}
function binghuodao() {
	var jhlist = g_obj_map.get("msg_jh_list").get("finish35");
	if (jhlist != undefined && jhlist != 0) {
		overrideclick("jh 35");
		overrideclick("go northwest");
		overrideclick("go northwest");
		overrideclick("go northwest");
		overrideclick("go north");
		overrideclick("go northeast");
		overrideclick("go northwest");
		overrideclick("go west");
		overrideclick("go northwest");
		overrideclick("go east");
		overrideclick("go east");
		overrideclick("go east");
		overrideclick("go east");
		overrideclick("go east");
		overrideclick("go southeast");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("go west");
		overrideclick("go north");
		overrideclick("go west");
		overrideclick("event_1_53278632");
		overrideclick("sousuo");
		overrideclick("sousuo");
		overrideclick("home");
		g_gmain.notify_fail(HIG + "冰火岛日常结束" + NOR)
	} else {
	}
}
function pozhen() {
	var jhlist = g_obj_map.get("msg_jh_list").get("finish26");
	if (jhlist != undefined && jhlist != 0) {
		overrideclick("jh 26");
		overrideclick("go west");
		overrideclick("go west");
		overrideclick("go north");
		overrideclick("go north");
		overrideclick("event_1_14435995");
		overrideclick("go south");
		overrideclick("go east");
		overrideclick("go east");
		overrideclick("event_1_18075497");
		g_gmain.notify_fail(HIG + "破阵日常结束" + NOR);
		setTimeout(function() {
			binghuodao()
		}, 500)
	} else {
		setTimeout(function() {
			binghuodao()
		}, 500)
	}
}
function weieyu() {
	overrideclick("jh 37");
	overrideclick("go north");
	overrideclick("go east");
	overrideclick("go east");
	overrideclick("go northwest");
	overrideclick("go northwest");
	overrideclick("go west");
	overrideclick("go north");
	overrideclick("go east");
	overrideclick("go north");
	overrideclick("go east");
	overrideclick("go east");
	overrideclick("go east");
	overrideclick("go northeast");
	overrideclick("go northeast");
	overrideclick("go northeast");
	overrideclick("go southeast");
	overrideclick("go north");
	overrideclick("event_1_97487911");
	g_gmain.notify_fail(HIG + "喂过鳄鱼" + NOR);
	xiakedao1();
	var cmds = [ "cangjian get_all", "xueyin_shenbinggu unarmed get_all",
			"xueyin_shenbinggu blade get_all",
			"xueyin_shenbinggu throwing get_all",
			"xueyin_shenbinggu spear get_all",
			"xueyin_shenbinggu hammer get_all",
			"xueyin_shenbinggu axe get_all", "xueyin_shenbinggu whip get_all",
			"xueyin_shenbinggu stick get_all",
			"xueyin_shenbinggu staff get_all", ];
	setTimeout(function() {
		GoSlowAction(cmds)
	}, 300)
}
function scanEscapedFish() {
	if (!g_obj_map.containsKey("msg_work")) {
		go("work");
		setTimeout(scanEscapedFish, 500);
		return
	}
	for (var i = 0; i < g_obj_map.get("msg_work").size(); i++) {
		var item = g_obj_map.get("msg_work").elements[i];
		if (item.key.indexOf("work") > -1 && item.value.indexOf(",") > -1) {
			var cmd = item.value.split(",")[0];
			go("work click " + cmd)
		}
	}
}
var clearPuzzlesButton = document.createElement("button");
clearPuzzlesButton.innerText = "清谜题";
clearPuzzlesButton.isKuafu = false;
left0ButtonArray.push(clearPuzzlesButton);
clearPuzzlesButton.addEventListener("click", clearPuzzleFunc);
function clearPuzzleFunc() {
	overrideclick("auto_tasks cancel")
}
var qiangdipiButton = document.createElement("button");
qiangdipiButton.innerText = "开始抢物品";
right0ButtonArray.push(qiangdipiButton);
qiangdipiButton.addEventListener("click", qiangdipiFunc);
var qiangdipiTrigger = 0;
function qiangdipiFunc() {
	if (qiangdipiTrigger == 0) {
		qiangdipiButton.innerText = "停止抢物品";
		qiangdipiTrigger = 1;
		qiangItem()
	} else {
		if (qiangdipiTrigger == 1) {
			qiangdipiButton.innerText = "开始抢物品";
			qiangdipiTrigger = 0;
			knownlist = []
		}
	}
}
function qiangItem() {
	if (qiangdipiTrigger == 1) {
		var Objectlist = g_obj_map.get("msg_room").elements;
		for (var i = 0; i < Objectlist.length; i++) {
			if (Objectlist[i].key.indexOf("item") >= 0) {
				if (knownlist.indexOf(" " + Objectlist[i].value.split(",")[0]) < 0) {
					overrideclick("get1 " + Objectlist[i].value.split(",")[0],
							0)
				}
			}
		}
	}
}
function Qiang() {
	this.dispatchMessage = function(b) {
		var type = b.get("type"), subType = b.get("subtype");
		if (type == "jh" && subType == "new_item") {
			clickButton("get " + b.get("id"))
		}
	}
}
var qiang = new Qiang;
var QiXiaTalkButton = document.createElement("button");
QiXiaTalkButton.innerText = "奇侠领朱果";
QiXiaTalkButton.isKuafu = false;
left0ButtonArray.push(QiXiaTalkButton);
QiXiaTalkButton.addEventListener("click", QiXiaTalkFunc);
var QXretried = 0;
var QXStop = 0;
var QXTalkcounter = 1;
var QxTalking = 0;
function GetQXID(name, QXindex) {
	if (QXStop == 1 && qinmiFinished == 1) {
		return
	} else {
		if (g_obj_map.get("msg_room") == undefined || QXStop == 1) {
			setTimeout(function() {
				GetQXID(name, QXindex)
			}, 500)
		} else {
			console.log("开始寻找" + name + QXindex);
			var QX_ID = "";
			var npcindex = 0;
			var els = g_obj_map.get("msg_room").elements;
			for (var i = els.length - 1; i >= 0; i--) {
				if (els[i].key.indexOf("npc") > -1) {
					if (els[i].value.indexOf(",") > -1) {
						var elsitem_ar = els[i].value.split(",");
						if (elsitem_ar.length > 1 && elsitem_ar[1] == name) {
							console.log(elsitem_ar[0]);
							npcindex = els[i].key;
							QX_ID = elsitem_ar[0]
						}
					}
				}
			}
			if (QX_ID == null || QX_ID == undefined || QX_ID == 0) {
				clickButton("find_task_road qixia " + QXindex);
				setTimeout(function() {
					GetQXID(name, QXindex)
				}, 500)
			} else {
				console.log("找到奇侠编号" + QX_ID);
				if (QXTalkcounter <= 5) {
					console.log("开始与" + name + "第" + QXTalkcounter + "对话");
					QXTalkcounter++;
					clickButton("ask " + QX_ID);
					clickButton("find_task_road qixia " + QXindex);
					setTimeout(function() {
						GetQXID(name, QXindex)
					}, 500)
				} else {
					if (QXTalkcounter > 5) {
						QXTalkcounter = 1;
						console.log("与" + name + "对话完成");
						QixiaTotalCounter++;
						if (QixiaTotalCounter > finallist.length) {
							alert("活着的奇侠已经完成")
						} else {
							console.log("下一个目标是"
									+ finallist[QixiaTotalCounter]["name"])
						}
						talktoQixia()
					}
				}
			}
		}
	}
}
var QixiaTotalCounter = 0;
function TalkQXBase(name, QXindex) {
	var QX_NAME = name;
	console.log("开始撩" + QX_NAME + "！");
	if (g_obj_map.get("msg_room") != undefined) {
		g_obj_map.get("msg_room").clear()
	}
	overrideclick("find_task_road qixia " + QXindex);
	overrideclick("golook_room");
	setTimeout(function() {
		GetQXID(QX_NAME, QXindex)
	}, 500)
}
var currentTime = 0;
var delta_Time = 2000;
var QXStop = 0;
var qinmiFinished = 0;
var QiXiaList = [];
function QXWhisper() {
	this.dispatchMessage = function(b) {
		var type = b.get("type"), subtype = b.get("subType");
		if (type == "notice") {
			var msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
			if (msg.match("对你悄声道") != null) {
				QXStop = 1;
				alert(msg);
				QiXiaTalkButton.innerText = "继续奇侠"
			}
			console.log(msg)
		} else {
			if (type == "main_msg") {
				var msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
				if (msg.match("今日亲密度操作次数") != null) {
					var qinmi = parseInt(msg.split("(")[1].split("/")[0]);
					if (qinmi == 20) {
						QXStop = 1;
						qinmiFinished = 1;
						alert("今日亲密度操作已经达到20，奇侠功能暂停。再次使用请重新点击开始领取果子。");
						QXTalking = 0
					}
				}
			}
		}
	}
}
var whipser = new QXWhisper;
function GetQiXiaList() {
	var html = g_obj_map.get("msg_html_page");
	QxTalking = 1;
	if (html == undefined) {
		setTimeout(function() {
			GetQiXiaList()
		}, 500)
	} else {
		if (g_obj_map.get("msg_html_page").get("msg").match("江湖奇侠成长信息") == null) {
			setTimeout(function() {
				GetQiXiaList()
			}, 500)
		} else {
			QiXiaList = formatQx(g_obj_map.get("msg_html_page").get("msg"));
			console.log(QiXiaList);
			SortQiXia()
		}
	}
}
function SortQiXia() {
	var temp = {};
	var newarray = [];
	for (var i = 0; i < QiXiaList.length; i++) {
		for (var j = 1; j < QiXiaList.length - i; j++) {
			if (parseInt(QiXiaList[j - 1]["degree"]) < parseInt(QiXiaList[j]["degree"])) {
				temp = QiXiaList[j - 1];
				QiXiaList[j - 1] = QiXiaList[j];
				QiXiaList[j] = temp
			}
		}
	}
	var tempcounter = 0;
	var over3 = [];
	for (var i = 0; i < QiXiaList.length; i++) {
		if (parseInt(QiXiaList[i]["degree"]) >= 30000) {
			over3.push(i)
		}
	}
	var overarray = [];
	var overcounter = 0;
	for (var i = 0; i < QiXiaList.length; i++) {
		if (over3.indexOf(i) < 0) {
			overarray[overcounter] = QiXiaList[i];
			overcounter++
		}
	}
	for (var i = 0; i < over3.length; i++) {
		overarray[overcounter] = QiXiaList[over3[i]];
		overcounter++
	}
	finallist = [];
	finallist = overarray;
	getZhuguo()
}
function getZhuguo() {
	var msg = "";
	console.log(finallist);
	for (var i = 0; i < 4; i++) {
		if (finallist[i]["isOk"] != true && !finallist[i]["full"]) {
			msg += finallist[i]["name"] + " "
		}
	}
	if (msg != "") {
		alert("根据您的奇侠亲密好感度，目前可以最优化朱果数目的以下奇侠不在江湖或者已经死亡：" + msg
				+ "。请您稍后再尝试使用奇侠领取朱果服务。")
	} else {
		talktoQixia()
	}
}
var unfinish = "";
function talktoQixia() {
	if (QixiaTotalCounter <= finallist.length) {
		if (!finallist[QixiaTotalCounter]["isOk"]
				&& !finallist[QixiaTotalCounter]["full"]) {
			QixiaTotalCounter++;
			talktoQixia();
			return
		}
		var Qixianame = "";
		var QixiaIndex = 0;
		Qixianame = finallist[QixiaTotalCounter]["name"];
		QixiaIndex = finallist[QixiaTotalCounter]["index"];
		if (finallist[QixiaTotalCounter]["isOk"] != true
				&& !finallist[QixiaTotalCounter]["full"]) {
			alert("奇侠" + Qixianame
					+ "目前不在江湖，可能死亡，可能在师门。领取朱果中断，请在一段时间之后重新点击领取朱果按钮。无需刷新页面");
			return
		} else {
			if (finallist[QixiaTotalCounter]["full"]) {
				go("open jhqx " + QixiaIndex);
				QixiaTotalCounter++;
				if (QixiaTotalCounter > finallist.length) {
					alert("活着的奇侠已经完成")
				} else {
					console
							.log("下一个目标是"
									+ finallist[QixiaTotalCounter]["name"])
				}
				talktoQixia()
			} else {
				clickButton("find_task_road qixia " + QixiaIndex);
				GetQXID(Qixianame, QixiaIndex)
			}
		}
	}
}
var finallist = [];
function QiXiaTalkFunc() {
	if (!mijingProtection()) {
		return
	}
	var QiXiaList_Input = "";
	if (QXStop == 0) {
		clickButton("open jhqx", 0);
		GetQiXiaList()
	} else {
		if (QXStop == 1 && qinmiFinished == 0) {
			QXStop = 0;
			QiXiaTalkButton.innerText = "奇侠领朱果"
		} else {
			if (QXStop == 1 && qinmiFinished == 1) {
				QXStop = 0;
				QixiaList = [];
				finallist = [];
				QXTalkcounter = 1;
				QixiaTotalCounter = 0;
				clickButton("open jhqx", 0);
				GetQiXiaList()
			}
		}
	}
}
function formatQx(str) {
	var tmpMsg = removeSpec(str);
	var arr = tmpMsg.match(/<tr>(.*?)<\/tr>/g);
	var qxArray = [];
	var qxInfo = {};
	if (arr) {
		for (var i = 0; i < arr.length; i++) {
			qxInfo = {};
			arr2 = arr[i]
					.match(/<td[^>]*>([^\d\(]*)\(?(\d*)\)?(朱果)?<\/td><td[^>]*>(.*?)<\/td><td[^>]*>(.*?)<\/td><td[^>]*>.*?<\/td>/);
			qxInfo["name"] = arr2[1];
			qxInfo["degree"] = arr2[2] == "" ? 0 : arr2[2];
			qxInfo["full"] = arr2[3] == "朱果";
			if (arr2[4].match("未出世") != null || arr2[5].match("师门") != null) {
				qxInfo["isOk"] = false
			} else {
				qxInfo["isOk"] = true
			}
			qxInfo["index"] = i;
			qxArray.push(qxInfo)
		}
		return qxArray
	}
	return []
}
function removeSpec(str) {
	var tmp = g_simul_efun.replaceControlCharBlank(str.replace(
			/\u0003.*?\u0003/g, ""));
	tmp = tmp.replace(/[\x01-\x09|\x11-\x20]+/g, "");
	return tmp
}
function getSilverKeys() {
	overrideclick("jh 20");
	overrideclick("go west");
	overrideclick("go west");
	overrideclick("go south");
	overrideclick("go east");
	overrideclick("go south");
	overrideclick("go south");
	overrideclick("go south");
	overrideclick("go south");
	overrideclick("go south");
	overrideclick("go southwest");
	overrideclick("go southwest");
	overrideclick("go south");
	overrideclick("go south");
	overrideclick("go south");
	overrideclick("go south");
	overrideclick("go east");
	overrideclick("go east");
	overrideclick("event_1_3723773");
	overrideclick("get yin yaoshi");
	overrideclick("go south");
	overrideclick("give gumu_longnv");
	overrideclick("home");
	overrideclick("study gumu_yufeng-book")
}
var buyOneBeeButton = document.createElement("button");
buyOneBeeButton.innerText = "买东西";
buyOneBeeButton.addEventListener("click", buyOneBeeFunc);
function buyOneBeeFunc() {
	var object = "";
	var num = 0;
	if (!(num = prompt("请输入购买的鱼竿鱼饵数量*10：", "10"))) {
		return
	}
	num = parseInt(num);
	for (var i = 0; i < num; i++) {
		go("shop money_buy shop5_N_10")
	}
	for (var i = 0; i < num; i++) {
		go("shop money_buy shop6_N_10")
	}
}
var userMedecineButton = document.createElement("button");
userMedecineButton.innerText = "一键恢复";
right0ButtonArray.push(userMedecineButton);
userMedecineButton.addEventListener("click", userMedecineFunc);
var healtriger = 0;
function userMedecineFunc() {
	if (healtriger == 0) {
		healtriger = 1;
		clickButton("score");
		setTimeout(function() {
			clickButton("golook_room")
		}, 500);
		setTimeout(healFunc, 300);
		userMedecineButton.innerText = "停止恢复";
		g_gmain.notify_fail(HIG + "开始恢复血量和内力" + NOR)
	} else {
		g_gmain.notify_fail(HIR + "已经停止一键恢复功能" + NOR);
		userMedecineButton.innerText = "一键恢复";
		healtriger = 0
	}
}
var WabaoButton = document.createElement("button");
WabaoButton.innerText = "自动挖宝";
WabaoButton.addEventListener("click", WabaoFunc);
function WabaoFunc() {
	overrideclick("cangbaotu_op1", 1)
}
var enableEquipeButton = document.createElement("button");
enableEquipeButton.innerText = "一键装备";
left0ButtonArray.push(enableEquipeButton);
enableEquipeButton.addEventListener("click", enableEquipeFunc);
function enableEquipeFunc() {
	clickButton("auto_equip on", 0)
}
var aotureconnectButton = document.createElement("button");
aotureconnectButton.innerText = "自动重连";
left0ButtonArray.push(aotureconnectButton);
aotureconnectButton.addEventListener("click", aotureconnectFunc);
var aotureconnectTrigger = 0;
function aotureconnectFunc() {
	if (aotureconnectTrigger) {
		aotureconnectTrigger = 0;
		aotureconnectButton.innerText = "自动重连"
	} else {
		aotureconnectTrigger = 1;
		aotureconnectButton.innerText = "停止重连";
		g_gmain.g_delay_connect = 0;
		connectServer()
	}
}
var aotucangbaotuButton = document.createElement("button");
aotucangbaotuButton.innerText = "自动藏宝图";
aotucangbaotuButton.isKuafu = false;
left0ButtonArray.push(aotucangbaotuButton);
aotucangbaotuButton.addEventListener("click", aotucangbaotuFunc);
var cangbaotuRadio1 = document.createElement("INPUT");
cangbaotuRadio1.type = "radio";
cangbaotuRadio1.name = "cangbaotuSelect";
cangbaotuRadio1.checked = "checked";
var cangbaotulabel1 = document.createElement("label");
cangbaotulabel1.innerText = "杀好人";
cangbaotulabel1.style.visibility = "hidden";
cangbaotulabel1.style.position = "absolute";
cangbaotulabel1.appendChild(cangbaotuRadio1);
cangbaotulabel1.style.top = 0;
document.body.appendChild(cangbaotulabel1);
otherButtonArray.push(cangbaotulabel1);
var cangbaotuRadio2 = document.createElement("INPUT");
cangbaotuRadio2.type = "radio";
cangbaotuRadio2.name = "cangbaotuSelect";
var cangbaotulabel2 = document.createElement("label");
cangbaotulabel2.innerText = "杀恶人";
cangbaotulabel2.style.visibility = "hidden";
cangbaotulabel2.style.position = "absolute";
cangbaotulabel2.style.top = 0;
cangbaotulabel2.appendChild(cangbaotuRadio2);
document.body.appendChild(cangbaotulabel2);
otherButtonArray.push(cangbaotulabel2);
var aotucangbaotuTrigger = 0;
function aotucangbaotuFunc() {
	if (aotucangbaotuTrigger) {
		aotucangbaotuTrigger = 0;
		aotucangbaotuButton.innerText = "自动藏宝图";
		cangbaotulabel1.style.visibility = "hidden";
		cangbaotulabel2.style.visibility = "hidden"
	} else {
		aotucangbaotuTrigger = 1;
		aotucangbaotuButton.innerText = "停止藏宝图";
		cangbaotulabel1.style.left = "75px";
		cangbaotulabel1.style.top = $(aotucangbaotuButton).offset().top - 10
				+ "px";
		cangbaotulabel1.style.visibility = "visible";
		cangbaotulabel1.style.backgroundColor = "rgba(255,255,255,0.4)";
		cangbaotulabel2.style.left = "75px";
		cangbaotulabel2.style.top = $(aotucangbaotuButton).offset().top + 15
				+ "px";
		cangbaotulabel2.style.visibility = "visible";
		cangbaotulabel2.style.backgroundColor = "rgba(255,255,255,0.4)"
	}
}
var aotunianshouButton = document.createElement("button");
aotunianshouButton.innerText = "守年兽";
aotunianshouButton.addEventListener("click", aotunianshouFunc);
var aotunianshouTrigger = 0;
var aotunianshouTimer = null;
function aotunianshouFunc() {
	if (aotunianshouTrigger) {
		aotunianshouTrigger = 0;
		aotunianshouButton.innerText = "守年兽";
		clearInterval(aotunianshouTimer)
	} else {
		aotunianshouTrigger = 1;
		aotunianshouButton.innerText = "停止守年兽";
		aotunianshouTimer = setInterval(shibamo, 1000)
	}
}
function shibamo() {
	for (var i = 1; i <= g_obj_map.get("msg_room").size(); i++) {
		var item = g_obj_map.get("msg_room").get("item" + i);
		if (item) {
			itemid = item.split(",")[0];
			go("get " + itemid)
		}
	}
}
var qiehuankuafuButton = document.createElement("button");
qiehuankuafuButton.innerText = "进跨服";
left0ButtonArray.push(qiehuankuafuButton);
qiehuankuafuButton.addEventListener("click", qiehuankuafuFunc);
var qiehuankuafuTrigger = 0;
function qiehuankuafuFunc() {
	if (qiehuankuafuTrigger) {
		qiehuankuafuTrigger = 0;
		g_world_uid = g_world_port = g_world_ip = 0;
		sock.close(), sock = 0, g_gmain.g_delay_connect = 0, connectServer();
		qiehuankuafuButton.innerText = "进跨服"
	} else {
		qiehuankuafuTrigger = 1;
		g_world_ip = "sword-inter1-direct.yytou.cn", g_world_port = 8881,
				g_world_uid = g_obj_map.get("msg_attrs").get("id").replace("u",
						"")
						+ "-1a1a", sock.close(), sock = 0,
				g_gmain.g_delay_connect = 0, connectServer();
		qiehuankuafuButton.innerText = "回本服"
	}
	buttonhideFunc()
}
(function() {
	if (g_world_uid) {
		qiehuankuafuTrigger = 1
	}
})();
var fanjiTrigger = 0;
function fanjiFunc() {
	if (fanjiTrigger == 0) {
		g_gmain.notify_fail(HIG + "天下武功，为快不破！" + NOR);
		g_gmain.notify_fail(HIR + "你的出招，快如闪电！" + NOR);
		fanjiButton.innerText = "停止自动破招";
		fanjiTrigger = 1
	} else {
		if (fanjiTrigger == 1) {
			fanjiButton.innerText = "自动破招";
			fanjiTrigger = 0
		}
	}
}
var onekillButton = document.createElement("button");
onekillButton.innerText = "循环击杀";
right0ButtonArray.push(onekillButton);
onekillButton.addEventListener("click", onekillFunc);
var onekill2Button = document.createElement("button");
onekill2Button.innerText = "击杀对面";
right0ButtonArray.push(onekill2Button);
onekill2Button.addEventListener("click", onekill2Func);
var onekillTrigger = 0;
var onekillTimer = null;
var killOptTarget = false;
function onekillFunc() {
	if (onekillTrigger == 0) {
		killOptTarget = false;
		onekillButton.innerText = "停止循环击杀";
		onekill2Button.innerText = "停止循环击杀";
		onekillTrigger = 1;
		clearInterval(onekillTimer);
		killloop();
		onekillTimer = setInterval(killloop, 500)
	} else {
		if (onekillTrigger == 1) {
			onekillButton.innerText = "循环击杀";
			onekill2Button.innerText = "击杀对面";
			onekillTrigger = 0;
			clearInterval(onekillTimer);
			cmdlist = [];
			loopnpcid = ""
		}
	}
}
function onekill2Func() {
	if (onekillTrigger == 0) {
		killOptTarget = true;
		onekillButton.innerText = "停止循环击杀";
		onekill2Button.innerText = "停止循环击杀";
		onekillTrigger = 1;
		clearInterval(onekillTimer);
		killloop();
		onekillTimer = setInterval(killloop, 500)
	} else {
		if (onekillTrigger == 1) {
			onekillButton.innerText = "循环击杀";
			onekill2Button.innerText = "击杀对面";
			onekillTrigger = 0;
			clearInterval(onekillTimer);
			cmdlist = [];
			loopnpcid = ""
		}
	}
}
var killpause = 0;
var loopnpcid = "";
function killloop() {
	if (!hasGoToEnd()) {
		return
	}
	if (g_obj_map.get("msg_npc") == undefined) {
		g_gmain.notify_fail("目前无法读取你的目标，请点开一个NPC重试。");
		onekillButton.innerText = "循环击杀";
		onekill2Button.innerText = "击杀对面";
		onekillTrigger = 0;
		clearInterval(onekillTimer);
		cmdlist = [];
		loopnpcid = "";
		return
	}
	loopnpcid = g_obj_map.get("msg_npc").get("id");
	if (killOptTarget) {
		var isfind = false;
		var optNpcid = "";
		var vsinfo = g_obj_map.get("msg_vs_info");
		if (vsinfo) {
			for (var i = 1; i <= 8; i++) {
				if (loopnpcid == vsinfo.get("vs1_pos" + i)) {
					isfind = true;
					optNpcid = vsinfo.get("vs2_pos1") || vsinfo.get("vs2_pos2")
							|| vsinfo.get("vs2_pos3") || vsinfo.get("vs2_pos4")
							|| vsinfo.get("vs2_pos5") || vsinfo.get("vs2_pos6")
							|| vsinfo.get("vs2_pos7") || vsinfo.get("vs2_pos8");
					break
				}
			}
			if (!isfind) {
				for (var i = 1; i <= 8; i++) {
					if (loopnpcid == vsinfo.get("vs2_pos" + i)) {
						isfind = true;
						optNpcid = vsinfo.get("vs1_pos1")
								|| vsinfo.get("vs1_pos2")
								|| vsinfo.get("vs1_pos3")
								|| vsinfo.get("vs1_pos4")
								|| vsinfo.get("vs1_pos5")
								|| vsinfo.get("vs1_pos6")
								|| vsinfo.get("vs1_pos7")
								|| vsinfo.get("vs1_pos8");
						break
					}
				}
			}
		}
		if (optNpcid) {
			loopnpcid = optNpcid
		} else {
			g_gmain.notify_fail("目前无法读取你的目标，进入观战后重试。");
			onekillButton.innerText = "循环击杀";
			onekill2Button.innerText = "击杀对面";
			onekillTrigger = 0;
			clearInterval(onekillTimer);
			cmdlist = [];
			loopnpcid = "";
			return
		}
	}
	clickButton("kill " + loopnpcid)
}
function Onekill() {
	this.dispatchMessage = function(b) {
		var type = b.get("type"), subType = b.get("subtype");
		if (type == "vs") {
			console.log(subType);
			if (subType == "vs_info") {
				killpause = 1
			} else {
				if (subType == "combat_result") {
					console.log(1);
					clickButton("kill " + loopnpcid);
					killpause = 0
				}
			}
		}
		if (type == "notice" && subType == "notify_fail") {
			if (b.get("msg").match("已经太多人了") != null) {
				setTimeout(killloop, 500)
			} else {
				if (b.get("msg").match("这儿没有这个人") != null) {
					killpause = 0
				}
			}
		}
		if (type == "jh" && subType == "new_npc") {
			if (b.get("id") == loopnpcid) {
				if (killpause == 0) {
					clickButton("kill " + loopnpcid)
				}
				overrideclick("playskill 1")
			}
		}
	}
}
var onekill = new Onekill;
var escapeButton = document.createElement("button");
escapeButton.innerText = "逃跑回坑";
right0ButtonArray.push(escapeButton);
escapeButton.addEventListener("click", escapeStart);
var escapeTrigger = 0;
var escapeTimer = null;
function escapeStart() {
	escapeTrigger = 1;
	clearInterval(escapeTimer);
	escapeTimer = setInterval(escapeloop, 500)
}
function escapeloop() {
	clickButton("escape", 0);
	if (is_fighting == 0 || g_gmain.g_delay_connect > 0) {
		escapeTrigger = 0;
		clearInterval(escapeTimer)
	}
}
function EscapeFunc() {
	this.dispatchMessage = function(b) {
		var type = b.get("type"), subType = b.get("subtype");
		console.log(type);
		console.log(subType);
		var combat = g_obj_map.get("msg_vs_info");
		if (combat == undefined) {
			return
		}
		var npcid;
		var opnpc;
		var me = g_obj_map.get("msg_attrs").get("id");
		for (var i = 0; i < 4; i++) {
			if (combat.get("vs1_pos" + i) == me) {
				opnpc = combat.get("vs1_pos1");
				npcid = combat.get("vs2_pos1")
			} else {
				if (combat.get("vs2_pos" + i) == me) {
					opnpc = combat.get("vs2_pos1");
					npcid = combat.get("vs1_pos1")
				}
			}
		}
		if (type == "notice" && subType == "escape") {
			var msg = g_simul_efun.replaceControlCharBlank(b.get("msg"));
			console.log(msg);
			if (msg.match("逃跑成功") != null) {
				escapeTrigger = 0;
				if (changeTrigger == 1) {
					restartFight(opnpc)
				} else {
					if (changeTrigger == 0) {
						restartFight(npcid)
					}
				}
			}
		}
	};
	var restartFight = function(npcid) {
		if (is_using_drug) {
			setTimeout(function() {
				restartFight(npcid)
			}, 200);
			return
		}
		if (changeTrigger == 1) {
			changeTrigger = 0
		}
		clickButton("fight " + npcid, 0);
		clickButton("kill " + npcid, 0)
	}
}
var escapechangeButton = document.createElement("button");
escapechangeButton.innerText = "逃跑换边";
right0ButtonArray.push(escapechangeButton);
escapechangeButton.addEventListener("click", escapechangeStart);
var changeTrigger = 0;
function escapechangeStart() {
	escapeTrigger = 1;
	changeTrigger = 1;
	escapeloop()
}
function healFunc() {
	if (healtriger == 0) {
		return
	}
	if (!hasGoToEnd()) {
		setTimeout(function() {
			healFunc()
		}, 500);
		return
	}
	if (cmdlist.indexOf("score") > -1 || cmdlist.indexOf("recovery") > -1) {
		return
	}
	var kee = parseInt(g_obj_map.get("msg_attrs").get("kee"));
	var max_kee = parseInt(g_obj_map.get("msg_attrs").get("max_kee"));
	var force = parseInt(g_obj_map.get("msg_attrs").get("force"));
	var max_force = parseInt(g_obj_map.get("msg_attrs").get("max_force"));
	if (kee < max_kee) {
		if (force > 0) {
			clickButton("recovery");
			setTimeout(healFunc, 300);
			return
		} else {
			eatlingzhi(healFunc)
		}
	} else {
		eatlingzhi();
		userMedecineButton.innerText = "一键恢复";
		healtriger = 0
	}
	function eatlingzhi(callback) {
		if (cmdlist.indexOf("items use snow_qiannianlingzhi") > -1) {
			return
		}
		var kee = parseInt(g_obj_map.get("msg_attrs").get("kee"));
		var max_kee = parseInt(g_obj_map.get("msg_attrs").get("max_kee"));
		var force = parseInt(g_obj_map.get("msg_attrs").get("force"));
		var max_force = parseInt(g_obj_map.get("msg_attrs").get("max_force"));
		var num = Math.floor((max_force - force)
				/ (max_force >= 60000 ? 30000 : 5000));
		if (num == 0) {
			num = 1
		}
		var cmd = "";
		if (max_force >= 60000) {
			while (num-- > 0) {
				go("items use snow_wannianlingzhi")
			}
		} else {
			while (num-- > 0) {
				go("items use snow_qiannianlingzhi")
			}
		}
		if (callback) {
			setTimeout(function() {
				callback()
			}, 1000)
		}
	}
}
var escapeFunc = new EscapeFunc;
var killerButton = document.createElement("button");
killerButton.innerText = "杀人魔称号";
killerButton.addEventListener("click", killerFunc);
var killerTrigger = 0;
var killorkilled = 0;
var killedid = "";
function killerFunc() {
	var num;
	if (killerTrigger == 0) {
		if (!(num = prompt("请问你是杀人者还是祭品？（1杀人者，2祭品，3毛毛）：", "1"))) {
			return
		}
		num = parseInt(num);
		if (num == 1) {
			killorkilled = 1;
			killer()
		} else {
			if (num == 2) {
				killorkilled = 2;
				bekilled()
			} else {
				if (num == 3) {
					alert("毛毛最可爱了~喵~")
				} else {
					alert("没有这个选项， 快滚！再乱输入老子打死你！")
				}
			}
		}
		if (num != 0) {
			killerTrigger = 1;
			killerButton.innerText = "停止杀人魔";
			selfprotection()
		}
	} else {
		killerTrigger = 0;
		killerButton.innerText = "杀人魔称号"
	}
}
var chuzhen2Button = document.createElement("button");
chuzhen2Button.innerText = "自动出阵2";
right0ButtonArray.push(chuzhen2Button);
chuzhen2Button.addEventListener("click", chuzhen2Func);
var chuzhen2Trigger = 0;
var chuzhen2Timer = null;
function chuzhen2Func() {
	if (chuzhen2Trigger == 0) {
		chuzhen2Button.innerText = "停止自动出阵";
		chuzhen2Trigger = 1;
		customSkillClass.restorageCustomSkill();
		chuzhen2Timer = setInterval(function() {
			autochuzhen(1)
		}, 1000)
	} else {
		if (chuzhen2Trigger == 1) {
			chuzhen2Button.innerText = "自动出阵2";
			chuzhen2Trigger = 0;
			clearInterval(chuzhen2Timer)
		}
	}
}
var chuzhenButton = document.createElement("button");
chuzhenButton.innerText = "自动出阵";
right0ButtonArray.push(chuzhenButton);
chuzhenButton.addEventListener("click", chuzhenFunc);
var chuzhenTrigger = 0;
var chuzhenTimer = null;
function chuzhenFunc() {
	if (chuzhenTrigger == 0) {
		chuzhenButton.innerText = "停止自动出阵";
		chuzhenTrigger = 1;
		customSkillClass.restorageCustomSkill();
		chuzhenTimer = setInterval(function() {
			autochuzhen(0)
		}, 1000)
	} else {
		if (chuzhenTrigger == 1) {
			chuzhenButton.innerText = "自动出阵";
			chuzhenTrigger = 0;
			clearInterval(chuzhenTimer)
		}
	}
}
function autochuzhen(id) {
	if (!window.localStorage["CustomSkillStorage_"
			+ g_obj_map.get("msg_attrs").get("id")]) {
		return
	}
	if (huiXueHuiNei()) {
		return
	}
	if (customSkillClass.restorageCustomSkillObj[id].restorageSettingCustomSkillArray.length == 0) {
		var skillresult = window.localStorage["CustomSkillStorage_"
				+ g_obj_map.get("msg_attrs").get("id")];
		customSkillClass.restorageCustomSkillObj[id].restorageSettingCustomSkillArray = skillresult
				.split("|")[0].split(",");
		customSkillClass.restorageCustomSkillObj[id].restorageSettingCustomSkillxdz = +skillresult
				.split("|")[1]
	}
	if (is_fighting
			&& !g_obj_map.get("msg_vs_info").containsKey("is_watcher")
			&& gSocketMsg.get_xdz() >= customSkillClass.restorageCustomSkillObj[id].restorageSettingCustomSkillxdz) {
		customSkillClass.playCustomSkill(id)
	}
}
function huiXueHuiNei() {
	if (gSocketMsg.get_xdz() < 2) {
		return false
	}
	var kee = +g_obj_map.get("msg_attrs").get("kee");
	var max_kee = +g_obj_map.get("msg_attrs").get("max_kee");
	var force = +g_obj_map.get("msg_attrs").get("force");
	var max_force = +g_obj_map.get("msg_attrs").get("max_force");
	var enforce = +g_obj_map.get("msg_attrs").get("force_factor");
	if (kee / max_kee < 0.5 && force > 0 && neigongPlayCount < 3) {
		if (gSocketMsg.get_xdz() < 3) {
			return false
		}
		var gaojineigong = [ "生生造化功", "道种心魔经" ];
		var zixueneigong = "紫血大法";
		var neigong = [ "碧血心法", "易筋经神功", "八荒功", "葵花宝典", "紫霞神功", "天邪神功",
				"不动明王诀", "茅山道术" ];
		for (var i = 1; i <= 8; i++) {
			if (g_obj_map.get("skill_button" + i) != undefined
					&& $.inArray(ansi_up.ansi_to_text(g_obj_map.get(
							"skill_button" + i).get("name")), gaojineigong) > -1) {
				clickButton("playskill " + i, 0);
				neigongPlayCount++;
				return true
			}
		}
		for (var i = 1; i <= 8; i++) {
			if (g_obj_map.get("skill_button" + i) != undefined
					&& ansi_up.ansi_to_text(g_obj_map.get("skill_button" + i)
							.get("name")) == zixueneigong) {
				clickButton("playskill " + i, 0);
				neigongPlayCount++;
				return true
			}
		}
		for (var i = 1; i <= 8; i++) {
			if (g_obj_map.get("skill_button" + i) != undefined
					&& $.inArray(ansi_up.ansi_to_text(g_obj_map.get(
							"skill_button" + i).get("name")), neigong) > -1) {
				clickButton("playskill " + i, 0);
				neigongPlayCount++;
				return true
			}
		}
	} else {
		if (kee / max_kee < 0.5) {
			var zixueneigong = "紫血大法";
			if (gSocketMsg.get_xdz() < 3) {
				return false
			}
			for (var i = 1; i <= 8; i++) {
				if (g_obj_map.get("skill_button" + i) != undefined
						&& ansi_up.ansi_to_text(g_obj_map.get(
								"skill_button" + i).get("name")) == zixueneigong) {
					clickButton("playskill " + i, 0);
					return true
				}
			}
		}
	}
	if ((force / max_force < 0.222 && (kee / max_kee > 0.8 || neigongPlayCount >= 3))
			|| force <= enforce * 5) {
		for (var i = 1; i <= 8; i++) {
			if (g_obj_map.containsKey("skill_button" + i)
					&& ansi_up.ansi_to_text(g_obj_map.get("skill_button" + i)
							.get("name")) == "不动明王诀") {
				clickButton("playskill " + i, 0);
				if (kee / max_kee <= 0.8 && force > 0 && neigongPlayCount < 3) {
					neigongPlayCount++
				}
				return true
			}
		}
	}
}
var fanjiButton = document.createElement("button");
fanjiButton.innerText = "自动破招";
right0ButtonArray.push(fanjiButton);
fanjiButton.addEventListener("click", fanjiFunc);
function killer() {
	overrideclick("jh 3");
	overrideclick("go west");
	overrideclick("event_1_59520311");
	overrideclick("go north");
	overrideclick("go north");
	overrideclick("go north");
	overrideclick("go north");
	killwatch()
}
function killwatch() {
	var room = g_obj_map.get("msg_room");
	if (room == undefined) {
		setTimeout(killwatch, 200)
	} else {
		var npc = room.get("npc1");
		if (npc == undefined) {
			setTimeout(killwatch, 200)
		} else {
			overrideclick("watch_vs huashancun_huashancun_fb4")
		}
	}
}
function bekilled() {
	overrideclick("jh 3");
	overrideclick("go west");
	overrideclick("event_1_59520311");
	overrideclick("go north");
	overrideclick("go north");
	overrideclick("go north");
	overrideclick("go north");
	overrideclick("kill huashancun_huashancun_fb4")
}
function selfprotection() {
	if (killerTrigger == 1 && killedid == "") {
		setTimeout(selfprotection, 200)
	} else {
		if (killerTrigger == 1 && killedid != "") {
			clickButton("fight " + killedid, 0);
			setTimeout(selfprotection, 3000)
		}
	}
}
function autoGodview() {
	if (g_obj_map.get("msg_attrs") == undefined) {
		setTimeout(autoGodview, 500)
	} else {
		GodMode = 1;
		GodButton.innerText = "停止强化"
	}
}
function killingstart() {
	this.dispatchMessage = function(b) {
		var type = b.get("type"), subType = b.get("subtype");
		if (type == "vs" && killorkilled == 1 && killedid == "") {
			var combat_info = g_obj_map.get("msg_vs_info");
			if (combat_info != undefined) {
				if (combat_info.get("vs1_pos1") == "huashancun_huashancun_fb4") {
					killedid = combat_info.get("vs2_pos1")
				} else {
					killedid = combat_info.get("vs1_pos1")
				}
				overrideclick("fight " + killedid);
				overrideclick("playskill 1")
			}
		} else {
			if (type == "vs" && subType == "combat_result") {
				if (killorkilled == 2) {
					overrideclick("kill huashancun_huashancun_fb4")
				} else {
					overrideclick("fight " + killedid);
					overrideclick("playskill 1")
				}
			}
		}
	}
}
var killing = new killingstart;
var fullpower = 0;
function hideButton(buttons) {
	if (buttons && buttons.length > 0) {
		$(buttons).each(function(i, ele) {
			ele.style.visibility = "hidden"
		});
		return
	}
	$(allButtons).each(function(i, ele) {
		ele.style.visibility = "hidden"
	});
	$(otherButtonArray).each(function(i, ele) {
		ele.style.visibility = "hidden"
	});
	left1ButtonsVisible = false
}
function showButton(buttons) {
	var buttonPos = 30;
	if (buttons && buttons.length > 0) {
		$(buttons).each(function(i, ele) {
			ele.style.bottom = buttonPos + "px";
			buttonPos = buttonPos + 30;
			ele.style.visibility = "visible";
			if (ele.innerText && TodayHasClicked(ele.innerText)) {
				ele.style.backgroundColor = "rgba(0,0,0,0.4)";
				ele.style.color = "#fff"
			}
		});
		return
	}
	$(left0ButtonArray).each(
			function(i, ele) {
				if ((ele.isKuafu === false && g_area_id == 100000)
						|| (ele.isBenfu === false && g_area_id != 100000)) {
					ele.style.visibility = "hidden"
				} else {
					ele.style.bottom = buttonPos + "px";
					buttonPos = buttonPos + 30;
					ele.style.visibility = "visible"
				}
			});
	buttonPos = 30;
	$(right0ButtonArray).each(
			function(i, ele) {
				if ((ele.isKuafu === false && g_area_id == 100000)
						|| (ele.isBenfu === false && g_area_id != 100000)) {
					ele.style.visibility = "hidden"
				} else {
					ele.style.bottom = buttonPos + "px";
					buttonPos = buttonPos + 30;
					ele.style.visibility = "visible"
				}
			})
}
function GetHongbao() {
	this.dispatchMessage = function(b) {
		var type = b.get("type"), msg = b.get("msg"), subtype = b
				.get("subtype");
		if ((type == "channel" && subtype == "hongbao" && /hongbao qiang \d gn(\d){16}/
				.test(msg))
				|| (type == "main_msg" && /hongbao qiang \d gn(\d){16}/
						.test(msg))) {
			if (hongbaoGetFull2 && /hongbao qiang 2 gn(\d){16}/.test(msg)) {
				return
			}
			if (hongbaoGetFull1 && /hongbao qiang 1 gn(\d){16}/.test(msg)) {
				return
			}
			var regexObj = new RegExp(/hongbao qiang \d gn(\d){16}/, "g");
			var a = regexObj.exec(msg);
			HongBaoList.unshift(a[0]);
			if (!qianghongbaoTimer) {
				RunHongBao()
			}
		}
		if (hongbaoGetFull2 == false && type == "notice"
				&& subtype == "notify_fail" && msg
				&& msg.indexOf("新春红包的次数已达到上限了，明天再抢吧") > -1) {
			hongbaoGetFull2 = true;
			setTimeout(function() {
				hongbaoGetFull2 = false
			}, 3600000)
		}
		if (hongbaoGetFull1 == false && type == "notice"
				&& subtype == "notify_fail" && msg
				&& msg.indexOf("狗年红包的次数已达到上限了，明天再抢吧") > -1) {
			hongbaoGetFull1 = true;
			setTimeout(function() {
				hongbaoGetFull1 = false
			}, 3600000)
		}
	}
}
function RunHongBao() {
	if (HongBaoList.length > 0) {
		while (1) {
			var up = 10 > HongBaoList.length ? HongBaoList.length : 10;
			var index = Math.floor((Math.random() * up));
			if ((hongbaoGetFull2 && /hongbao qiang 2 gn(\d){16}/
					.test(HongBaoList[index]))
					|| (hongbaoGetFull1 && /hongbao qiang 1 gn(\d){16}/
							.test(HongBaoList[index]))) {
				HongBaoList.splice(index, 1)
			} else {
				var item = HongBaoList[index];
				HongBaoList.splice(index, 1);
				clickButton(item);
				qianghongbaoTimer = setTimeout(function() {
					RunHongBao()
				}, 5000);
				break
			}
		}
	} else {
		qianghongbaoTimer = null
	}
}
var qianghongbaoTimer = null;
var HongBaoList = [];
var getHongBao = new GetHongbao();
var hongbaoGetFull1 = false;
var hongbaoGetFull2 = false;
var allButtons = [];
function initButtons(buttons, buttonType) {
	$(buttons).each(function(i, ele) {
		ele.style.position = "absolute";
		ele.style.backgroundColor = "rgba(255,255,255,0.4)";
		ele.style.border = "none";
		ele.style.color = "#000";
		if (buttonType == 1) {
			ele.style.left = "0px"
		} else {
			if (buttonType == 2) {
				ele.style.left = "100px"
			} else {
				if (buttonType == 3) {
					ele.style.right = "0px"
				}
			}
		}
		ele.style.height = buttonHeight;
		document.body.appendChild(ele)
	});
	allButtons = ([]).concat(allButtons, buttons)
}
(function() {
	initButtons(left0ButtonArray, 1);
	initButtons(left1ButtonArray, 2);
	initButtons(right0ButtonArray, 3);
	buttonhideFunc()
})();
var dispatchMessageList = [];
dispatchMessageList
		.push(function(b) {
			var type = b.get("type"), msg = b.get("msg"), subtype = b
					.get("subtype");
			if (type == "look_item") {
				if ($("#out table:eq(1) tr button.cmd_click2:contains('搜索')").length == 0) {
					return
				}
				var newbutton = $(
						'<button type="button" class="cmd_click2">循环搜索</button>')
						.click(
								function() {
									if ($(this).html() == "搜索中...") {
										$(this).html("循环搜索");
										clearInterval(window.cusTimers.getitemTimer);
										return
									}
									$(this).html("搜索中...");
									var itemid = g_obj_map.get("msg_item").get(
											"id");
									clickButton("get " + itemid);
									if (!window.cusTimers) {
										window.cusTimers = {}
									}
									window.cusTimers.getitemTimer = setInterval(
											function() {
												clickButton("get " + itemid);
												var finditem = false;
												if (!g_obj_map.get("msg_room")) {
													clearInterval(window.cusTimers.getitemTimer);
													return
												}
												for (var i = 1; i < 100; i++) {
													var item = g_obj_map.get(
															"msg_room").get(
															"item" + i);
													if (item) {
														if (item
																.indexOf(itemid) > -1) {
															finditem = true
														}
													} else {
														break
													}
												}
												if (!finditem) {
													clearInterval(window.cusTimers.getitemTimer)
												}
											}, 1000)
								});
				$("#out table:eq(1) tr:first").append("<td></td>").find(
						"td:last").append(newbutton)
			}
		});
dispatchMessageList
		.push(function(b) {
			var type = b.get("type"), msg = b.get("msg"), subtype = b
					.get("subtype");
			if (type == "channel" && subtype == "sys" && msg
					&& msg.indexOf("今天你可是在我的地盘，看来你是在劫难逃！") > -1) {
				var lastlocation = "";
				var npc = "";
				var npcid = "";
				if (msg.indexOf("巫蛊王") > -1) {
					lastlocation = "n";
					npc = "巫蛊王";
					npcid = $(cangbaotuRadio1).is(":checked") ? "changan_yunguanhai1"
							: "changan_wuguwang"
				} else {
					if (msg.indexOf("夜千麟") > -1) {
						lastlocation = "s";
						npc = "夜千麟";
						npcid = $(cangbaotuRadio1).is(":checked") ? "changan_yiguogong1"
								: "changan_yeqianlin"
					} else {
						if (msg.indexOf("百毒旗主") > -1) {
							lastlocation = "w";
							npc = "百毒旗主";
							npcid = $(cangbaotuRadio1).is(":checked") ? "changan_heipaogong1"
									: "changan_baiduqizhu"
						} else {
							if (msg.indexOf("十方恶神") > -1) {
								lastlocation = "e";
								npc = "十方恶神";
								npcid = $(cangbaotuRadio1).is(":checked") ? "changan_duguxuyu1"
										: "changan_shifangeshen"
							}
						}
					}
				}
				var cmd = "jh 2;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;n;w;s;s;s;s;e;event_1_2215721;"
						+ lastlocation;
				writeToScreen("<span style='color:rgb(118, 235, 32)'>宝藏秘图碎片-"
						+ npc + "</span> [<a href=\"javascript:go('" + cmd
						+ "')\">GO</a>]", 2, 1);
				if (aotucangbaotuTrigger) {
					var killcmd = cmd + ";kill " + npcid;
					if (g_obj_map.get("msg_room")) {
						var map_id = g_obj_map.get("msg_room").get("map_id");
						var obj_p = g_obj_map.get("msg_room").get("obj_p");
						if (map_id == "changan") {
							if (obj_p == "4229") {
								killcmd = lastlocation + ";kill " + npcid
							} else {
								if (obj_p == "4363") {
									killcmd = lastlocation == "n" ? "kill "
											+ npcid : "s;" + lastlocation
											+ ";kill " + npcid
								} else {
									if (obj_p == "4334") {
										killcmd = lastlocation == "s" ? "kill "
												+ npcid : "n;" + lastlocation
												+ ";kill " + npcid
									} else {
										if (obj_p == "4182") {
											killcmd = lastlocation == "w" ? "kill "
													+ npcid
													: "e;" + lastlocation
															+ ";kill " + npcid
										} else {
											if (obj_p == "4342") {
												killcmd = lastlocation == "e" ? "kill "
														+ npcid
														: "w;" + lastlocation
																+ ";kill "
																+ npcid
											}
										}
									}
								}
							}
						}
					}
					window.singleBattleTrigger = 1;
					window.singleBattleInstance = new window.singleBattle(
							function() {
								var now = new Date();
								var today = new Date();
								today.setHours(6, 0, 0, 0);
								var nowtime = now.getTime();
								var today6diantime = today.getTime();
								if (now < today6diantime) {
									clickButton("clan bzmt puzz", 0);
									clickButton("clan bzmt puzz", 0);
									clickButton("clan bzmt puzz", 0);
									clickButton("clan bzmt puzz", 0)
								}
							});
					go(killcmd)
				}
			}
		});
dispatchMessageList.push(function(b) {
	var type = b.get("type"), msg = b.get("msg"), subtype = b.get("subtype");
	if (type == "show_html_page" && msg && msg.indexOf("江湖奇侠成长信息") > -1) {
		var arr = formatQx(msg);
		for (var i = 0; i < arr.length; i++) {
			if (arr[i]["isOk"]) {
				$("#out table tr:contains('" + arr[i]["name"] + "')").find(
						"td:eq(1)").html(
						"<a href=javascript:go('cus|talk|" + i + ","
								+ arr[i]["name"] + "')>领朱果</a>")
			}
		}
	}
});
function custalkQX(index, name) {
	go("find_task_road qixia " + index);
	setTimeout(function() {
		for (var i = 1; i <= g_obj_map.get("msg_room").size(); i++) {
			var npc = g_obj_map.get("msg_room").get("npc" + i);
			if (npc && npc.indexOf(name) > -1) {
				var id = npc.split(",")[0];
				for (var j = 0; j < 5; j++) {
					go("ask " + id)
				}
				break
			}
		}
		go("open jhqx")
	}, 500)
}
dispatchMessageList.push(function(b) {
	if (!aotunianshouTrigger) {
		return
	}
	var nianshouid = "snow_nianshou";
	var type = b.get("type"), subtype = b.get("subtype");
	if (type == "jh" && subtype == "new_item") {
		clickButton("get " + b.get("id"))
	} else {
		if (type == "jh" && subtype == "new_npc") {
			if (b.get("id") == nianshouid) {
				window.singleBattleTrigger = 1;
				window.singleBattleInstance = new window.singleBattle();
				go("kill " + b.get("id"))
			}
		}
	}
});
(function(window) {
	window.go = function(dir) {
		dir = $.trim(dir);
		if (dir.indexOf("cus|") == 0) {
			var dirarr = dir.split("|");
			switch (dirarr[1]) {
			case "talk":
				talkparamarr = dirarr[2].split(",");
				custalkQX(talkparamarr[0], talkparamarr[1]);
				return;
			case "playCustomSkill_0":
				customSkillClass.playCustomSkill(0);
				return;
			case "playCustomSkill_1":
				customSkillClass.playCustomSkill(1);
				return;
			case "setCustomSkill_0":
				customSkillClass.setCustomSkill(0);
				return;
			case "setCustomSkill_1":
				customSkillClass.setCustomSkill(1);
				return;
			case "setCustomSkillName_0":
				customSkillClass.setCustomSkillName(0);
				return;
			case "setCustomSkillName_1":
				customSkillClass.setCustomSkillName(1);
				return;
			case "standforpuzzle":
				var npcname = "";
				if (dirarr[4] == "killget") {
					npcname = prompt("请输入要杀的npc名称", "");
					if (npcname == "") {
						return
					}
				}
				standForPuzzle.add(dirarr[2], dirarr[3], dirarr[4], npcname);
				return;
			case "follow":
				var username = dirarr[2];
				followuser.follow(username);
				return;
			case "leader":
				var tobeleader = dirarr[2];
				followuser.toBeLeader(tobeleader == "1");
				return;
			case "startpuzzle":
				var puzzleid = dirarr[2];
				autoPuzzle.startpuzzle(puzzleid);
				return;
			case "puzzlekillget":
				autoPuzzle.puzzlekillget();
				return;
			case "puzzlesubmit":
				autoPuzzle.puzzlesubmit(dirarr[2]);
				return;
			case "vipclick":
				shimenvipFunc()
			}
		}
		var d = dir.split(";");
		for (var i = 0; i < d.length; i++) {
			overrideclick(d[i], 0)
		}
	};
	window.singleBattleTrigger = 0;
	window.singleBattleInstance = null;
	window.singleBattle = function(callback) {
		this.timer = null;
		this.callback = callback;
		this.dispatchMessage = function(b) {
			var type = b.get("type"), subType = b.get("subtype");
			if ((type == "vs" && subType == "vs_info")
					|| (this.timer == null && is_fighting)) {
				neigongPlayCount = 0;
				clearInterval(this.timer);
				setTimeout(autoSkill, 500);
				this.timer = setInterval(autoSkill, 1000)
			} else {
				if ((type == "vs" && subType == "combat_result")
						|| (this.timer != null && !is_fighting)) {
					window.singleBattleTrigger = 0;
					clearInterval(this.timer);
					this.timer = null;
					if (callback) {
						callback()
					}
				}
			}
		}
	};
	window.hasGoToEnd = function() {
		return cmdlist.length <= 0 && $("#img_loading:visible").length == 0
	};
	var ql_w = {
		"书房" : 1,
		"打铁铺子" : 2,
		"桑邻药铺" : 3,
		"南市" : 4,
		"桃花别院" : 5,
		"绣楼" : 6,
		"北大街" : 7,
		"钱庄" : 8,
		"杂货铺" : 9,
		"祠堂大门" : 10,
		"厅堂" : 11
	};
	window.go_ql = function(w) {
		zx(ql_w[w])
	};
	var old_adjustLayout = g_gmain.adjustLayout;
	g_gmain.adjustLayout = function() {
		old_adjustLayout();
		g_gmain.notifyEndTop = 0;
		g_gmain.notifyStartTop = 50
	};
	fanjiButton.style.visibility = "hidden";
	function go_yx(w) {
		if (w.startsWith("雪亭镇")) {
			go("jh 1;e;n")
		} else {
			if (w.startsWith("洛阳")) {
				go("jh 2;n;n")
			} else {
				if (w.startsWith("华山村")) {
					go("jh 3;s;s")
				} else {
					if (w.startsWith("华山")) {
						go("jh 4;n;n")
					} else {
						if (w.startsWith("扬州")) {
							go("jh 5;n;n")
						} else {
							if (w.startsWith("丐帮")) {
								go("jh 6;event_1_98623439;s")
							} else {
								if (w.startsWith("乔阴县")) {
									go("jh 7;s;s;s")
								} else {
									if (w.startsWith("峨眉山")) {
										go("jh 8;w;nw;n;n;n;n")
									} else {
										if (w.startsWith("恒山")) {
											go("jh 9;n;n;n")
										} else {
											if (w.startsWith("武当山")) {
												go("jh 10;w;n;n")
											} else {
												if (w.startsWith("晚月庄")) {
													go("jh 11;e;e;s;sw;se;w")
												} else {
													if (w.startsWith("水烟阁")) {
														go("jh 12;n;n;n")
													} else {
														if (w.startsWith("少林寺")) {
															go("jh 13;n;n")
														} else {
															if (w
																	.startsWith("唐门")) {
																go("jh 14;w;n;n;n")
															} else {
																if (w
																		.startsWith("青城山")) {
																	go("jh 15;s;s")
																} else {
																	if (w
																			.startsWith("逍遥林")) {
																		go("jh 16;s;s")
																	} else {
																		if (w
																				.startsWith("开封")) {
																			go("jh 17;n;n")
																		} else {
																			if (w
																					.startsWith("明教")) {
																				go("jh 18;n;nw;n;n")
																			} else {
																				if (w
																						.startsWith("全真教")) {
																					go("jh 19;s;s")
																				} else {
																					if (w
																							.startsWith("古墓")) {
																						go("jh 20;w;w")
																					} else {
																						if (w
																								.startsWith("白驮山")) {
																							go("jh 21;nw;w")
																						} else {
																							if (w
																									.startsWith("嵩山")) {
																								go("jh 22;n;n")
																							} else {
																								if (w
																										.startsWith("寒梅庄")) {
																									go("jh 23")
																								} else {
																									if (w
																											.startsWith("泰山")) {
																										go("jh 24")
																									} else {
																										if (w
																												.startsWith("大旗门")) {
																											go("jh 25")
																										} else {
																											if (w
																													.startsWith("大昭寺")) {
																												go("jh 26")
																											} else {
																												if (w
																														.startsWith("魔教")) {
																													go("jh 27")
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		random_move()
	}
	function random_move() {
		var v = Math.random();
		if (v < 0.25) {
			go("e")
		} else {
			if (v < 0.5) {
				go("w")
			} else {
				if (v < 0.75) {
					go("s")
				} else {
					go("n")
				}
			}
		}
	}
	function zx(x) {
		x = parseInt(x);
		console.debug(x);
		if (x == 1) {
			go("jh 1;e;n;e;e;e;e;n")
		} else {
			if (x == 2) {
				go("jh 1;e;n;n;w")
			} else {
				if (x == 3) {
					go("jh 1;e;n;n;n;w")
				}
			}
		}
		if (x == 4) {
			go("jh 2;n;n;e")
		}
		if (x == 5) {
			go("jh 2;n;n;n;n;w;s")
		}
		if (x == 6) {
			go("jh 2;n;n;n;n;w;s;w")
		}
		if (x == 7) {
			go("jh 2;n;n;n;n;n;n;n")
		}
		if (x == 8) {
			go("jh 2;n;n;n;n;n;n;;n;e")
		}
		if (x == 9) {
			go("jh 3;s;s;e")
		}
		if (x == 10) {
			go("jh 3;s;s;w")
		}
		if (x == 11) {
			go("jh 3;s;s;w;n")
		}
	}
	function MyMap() {
		this.elements = [];
		this.size = function() {
			return this.elements.length
		};
		this.isEmpty = function() {
			return 1 > this.elements.length
		};
		this.clear = function() {
			this.elements = []
		};
		this.put = function(a, b) {
			for (var c = !1, d = 0; d < this.elements.length; d++) {
				if (this.elements[d].key == a) {
					c = !0;
					this.elements[d].value = b;
					break
				}
			}
			!1 == c && this.elements.push({
				key : a,
				value : b
			})
		};
		this.remove = function(a) {
			var b = !1;
			try {
				for (var c = 0; c < this.elements.length; c++) {
					if (this.elements[c].key == a) {
						return this.elements.splice(c, 1), !0
					}
				}
			} catch (d) {
				b = !1
			}
			return b
		};
		this.get = function(a) {
			try {
				for (var b = 0; b < this.elements.length; b++) {
					if (this.elements[b].key == a) {
						return this.elements[b].value
					}
				}
			} catch (c) {
				return null
			}
		};
		this.copy = function(a) {
			null == a && (a = new Map);
			try {
				for (var b = 0; b < this.elements.length; b++) {
					a.put(this.elements[b].key, this.elements[b].value)
				}
				return a
			} catch (c) {
				return null
			}
		};
		this.element = function(a) {
			return 0 > a || a >= this.elements.length ? null : this.elements[a]
		};
		this.containsKey = function(a) {
			var b = !1;
			try {
				for (var c = 0; c < this.elements.length; c++) {
					if (this.elements[c].key == a) {
						b = !0;
						break
					}
				}
			} catch (d) {
				b = !1
			}
			return b
		};
		this.containsValue = function(a) {
			var b = !1;
			try {
				for (var c = 0; c < this.elements.length; c++) {
					if (this.elements[c].value == a) {
						b = !0;
						break
					}
				}
			} catch (d) {
				b = !1
			}
			return b
		};
		this.values = function() {
			for (var a = [], b = 0; b < this.elements.length; b++) {
				a.push(this.elements[b].value)
			}
			return a
		};
		this.keys = function() {
			for (var a = [], b = 0; b < this.elements.length; b++) {
				a.push(this.elements[b].key)
			}
			return a
		}
	}
	function Question() {
		this.answers = new MyMap;
		this.answers.put("锦缎腰带是腰带类的第几级装备", "a");
		this.answers.put("扬州询问黑狗子能到下面哪个地点", "a");
		this.answers.put("跨服天剑谷每周六几点开启", "a");
		this.answers.put("青城派的道德经可以提升哪个属性", "c");
		this.answers.put("论剑中以下哪个不是晚月庄的技能", "d");
		this.answers.put("跨服天剑谷是星期几举行的", "b");
		this.answers.put("玉女剑法是哪个门派的技能", "b");
		this.answers.put("玉草帽可以在哪位npc那里获得？", "b");
		this.answers.put("逍遥林是第几章的地图", "c");
		this.answers.put("精铁棒可以在哪位npc那里获得", "d");
		this.answers.put("鎏金缦罗是披风类的第几级装备", "d");
		this.answers.put("神雕大侠在哪一章", "a");
		this.answers.put("华山武器库从哪个NPC进", "d");
		this.answers.put("首冲重置卡需要隔多少天才能在每日充值奖励中领取", "b");
		this.answers.put("以下哪个不是空空儿教导的武学", "b");
		this.answers.put("“迎梅客栈”场景是在哪个地图上", "d");
		this.answers.put("独孤求败有过几把剑", "d");
		this.answers.put("晚月庄的小贩在下面哪个地点", "a");
		this.answers.put("扬州询问黑狗能到下面哪个地点", "a");
		this.answers.put("“清音居”场景是在哪个地图上", "a");
		this.answers.put("一天能完成师门任务有多少个", "c");
		this.answers.put("林祖师是哪个门派的师傅", "a");
		this.answers.put("九区服务器名称", "d");
		this.answers.put("去唐门地下通道要找谁拿钥匙", "a");
		this.answers.put("能增容貌的是下面哪个技能", "a");
		this.answers.put("铁手镯  可以在哪位npc那里获得", "a");
		this.answers.put("街头卖艺是挂机里的第几个任务", "a");
		this.answers.put("“三清宫”场景是在哪个地图上", "c");
		this.answers.put("论剑中以下哪个是大理段家的技能", "a");
		this.answers.put("藏宝图在哪里npc那里买", "a");
		this.answers.put("六脉神剑是哪个门派的绝学", "a");
		this.answers.put("如何将华山剑法从400级提升到440级", "d");
		this.answers.put("王重阳是哪个门派的师傅", "b");
		this.answers.put("在庙祝处洗杀气每次可以消除多少点", "a");
		this.answers.put("以下哪个宝石不能镶嵌到衣服", "a");
		this.answers.put("达摩杖的伤害是多少", "d");
		this.answers.put("嫁衣神功是哪个门派的技能", "b");
		this.answers.put("可以召唤金甲伏兵助战是哪个门派", "a");
		this.answers.put("端茶递水是挂机里的第几个任务", "b");
		this.answers.put("下列哪项战斗不能多个玩家一起战斗", "a");
		this.answers.put("寒玉床在哪里切割", "a");
		this.answers.put("拜师风老前辈需要正气多少", "b");
		this.answers.put("每天微信分享能获得多少元宝", "d");
		this.answers.put("丐帮的绝学是什么", "a");
		this.answers.put("以下哪个门派不是隐藏门派", "c");
		this.answers.put("玩家想修改名字可以寻找哪个NPC", "a");
		this.answers.put("论剑中以下哪个不是古墓派的的技能", "b");
		this.answers.put("安惜迩是在那个场景", "c");
		this.answers.put("神雕侠侣的时代背景是哪个朝代", "d");
		this.answers.put("论剑中以下哪个是华山派的技能的", "a");
		this.answers.put("夜皇在大旗门哪个场景", "c");
		this.answers.put("什么装备可以镶嵌紫水晶", "c");
		this.answers.put("乌檀木刀可以在哪位npc那里获得", "d");
		this.answers.put("易容后保持时间是多久", "a");
		this.answers.put("以下哪个不是宋首侠教导的武学", "d");
		this.answers.put("踏云棍可以在哪位npc那里获得", "a");
		this.answers.put("玉女剑法是哪个门派的技能", "b");
		this.answers.put("根骨能提升哪个属性", "c");
		this.answers.put("论剑中以下哪个是铁血大旗门的技能", "b");
		this.answers.put("明教的九阳神功有哪个特殊效果", "a");
		this.answers.put("辟邪剑法在哪学习", "b");
		this.answers.put("论剑中古墓派的终极师傅是谁", "d");
		this.answers.put("论剑中青城派的终极师傅是谁", "d");
		this.answers.put("逍遥林怎么弹琴可以见到天山姥姥", "b");
		this.answers.put("论剑一次最多能突破几个技能", "c");
		this.answers.put("劈雳拳套有几个镶孔", "a");
		this.answers.put("仓库最多可以容纳多少种物品", "b");
		this.answers.put("以下不是天宿派师傅的是哪个", "c");
		this.answers.put("易容术在哪学习", "b");
		this.answers.put("瑷伦在晚月庄的哪个场景", "b");
		this.answers.put("羊毛斗篷是披风类的第几级装备", "a");
		this.answers.put("弯月刀可以在哪位npc那里获得", "b");
		this.answers.put("骆云舟在乔阴县的哪个场景", "b");
		this.answers.put("屠龙刀是什么级别的武器", "a");
		this.answers.put("天蚕围腰可以镶嵌几颗宝石", "d");
		this.answers.put("“蓉香榭”场景是在哪个地图上", "c");
		this.answers.put("施令威在哪个地图", "b");
		this.answers.put("扬州在下面哪个地点的npc处可以获得玉佩", "c");
		this.answers.put("拜师铁翼需要多少内力", "b");
		this.answers.put("九区服务器名称", "d");
		this.answers.put('"白玉牌楼"场景是在哪个地图上', "c");
		this.answers.put("宝玉鞋在哪获得", "a");
		this.answers.put("落英神剑掌是哪个门派的技能", "b");
		this.answers.put("下面哪个门派是正派", "a");
		this.answers.put("兑换易容面具需要多少玄铁碎片", "c");
		this.answers.put("以下哪些物品是成长计划第五天可以领取的", "b");
		this.answers.put("论剑中以下哪个是晚月庄的人物", "a");
		this.answers.put("论剑中以下哪个不是魔教的技能", "a");
		this.answers.put("匕首加什么属性", "c");
		this.answers.put("钢丝甲衣可以在哪位npc那里获得", "d");
		this.answers.put("论剑中花紫会的师傅是谁", "c");
		this.answers.put("暴雨梨花针的伤害是多少", "c");
		this.answers.put("吸血蝙蝠在下面哪个地图", "a");
		this.answers.put("论剑中以下是峨嵋派技能的是哪个", "a");
		this.answers.put("蓝止萍在晚月庄哪个小地图", "b");
		this.answers.put("下面哪个地点不是乔阴县的", "d");
		this.answers.put("领取消费积分需要寻找哪个NPC", "c");
		this.answers.put("下面哪个不是门派绝学", "d");
		this.answers.put("人物背包最多可以容纳多少种物品", "a");
		this.answers.put("什么装备不能镶嵌黄水晶", "d");
		this.answers.put("古灯大师在大理哪个场景", "c");
		this.answers.put("草帽可以在哪位npc那里获得", "b");
		this.answers.put("西毒蛇杖的伤害是多少", "c");
		this.answers.put("成长计划六天可以领取多少银两", "d");
		this.answers.put("朱老伯在华山村哪个小地图", "b");
		this.answers.put("论剑中以下哪个是唐门的技能", "b");
		this.answers.put("游龙散花是哪个门派的阵法", "d");
		this.answers.put("高级乾坤再造丹加什么", "b");
		this.answers.put("唐门的唐门毒经有哪个特殊效果", "a");
		this.answers.put("葛伦在大招寺的哪个场景", "b");
		this.answers.put("“三清殿”场景是在哪个地图上", "b");
		this.answers.put("哪样不能获得玄铁碎片", "c");
		this.answers.put("在哪里捏脸提升容貌", "d");
		this.answers.put("论剑中以下哪个是天邪派的技能", "b");
		this.answers.put("向师傅磕头可以获得什么", "b");
		this.answers.put("骆云舟在哪一章", "c");
		this.answers.put("论剑中以下哪个不是唐门的技能", "c");
		this.answers.put("华山村王老二掉落的物品是什么", "a");
		this.answers.put("下面有什么是寻宝不能获得的", "c");
		this.answers.put("寒玉床需要切割多少次", "d");
		this.answers.put("绿宝石加什么属性", "c");
		this.answers.put("魏无极处读书可以读到多少级", "a");
		this.answers.put("天山姥姥在逍遥林的哪个场景", "d");
		this.answers.put("天羽奇剑是哪个门派的技能", "a");
		this.answers.put("大招寺的铁布衫有哪个特殊效果", "c");
		this.answers.put("挖剑冢可得什么", "a");
		this.answers.put("灭绝师太在峨眉山哪个场景", "a");
		this.answers.put("论剑是星期几举行的", "c");
		this.answers.put("柳淳风在雪亭镇哪个场景", "b");
		this.answers.put("萧辟尘在哪一章", "d");
		this.answers.put("论剑中以下哪个是明教的技能", "b");
		this.answers.put("天邪派在哪里拜师", "b");
		this.answers.put("钨金腰带是腰带类的第几级装备", "d");
		this.answers.put("灭绝师太在第几章", "c");
		this.answers.put("一指弹在哪里领悟", "b");
		this.answers.put("翻译梵文一次多少银两", "d");
		this.answers.put("刀法基础在哪掉落", "a");
		this.answers.put("黯然消魂掌有多少招式", "c");
		this.answers.put("黑狗血在哪获得", "b");
		this.answers.put("雪蕊儿在铁雪山庄的哪个场景", "d");
		this.answers.put("东方教主在魔教的哪个场景", "b");
		this.answers.put("以下属于正派的门派是哪个", "a");
		this.answers.put("选择武学世家会影响哪个属性", "a");
		this.answers.put("寒玉床睡觉一次多久", "c");
		this.answers.put("魏无极在第几章", "a");
		this.answers.put("孙天灭是哪个门派的师傅", "c");
		this.answers.put("易容术在哪里学习", "a");
		this.answers.put("哪个NPC掉落拆招基础", "a");
		this.answers.put("七星剑法是哪个门派的绝学", "a");
		this.answers.put("以下哪些物品不是成长计划第二天可以领取的", "c");
		this.answers.put("以下哪个门派是中立门派", "a");
		this.answers.put("黄袍老道是哪个门派的师傅", "c");
		this.answers.put("舞中之武是哪个门派的阵法", "b");
		this.answers.put("隐者之术是那个门派的阵法", "a");
		this.answers.put("踏雪无痕是哪个门派的技能", "b");
		this.answers.put("以下哪个不是在雪亭镇场景", "d");
		this.answers.put("排行榜最多可以显示多少名玩家", "a");
		this.answers.put("貂皮斗篷是披风类的第几级装备", "b");
		this.answers.put("武当派的绝学技能是以下哪个", "d");
		this.answers.put("兰花拂穴手是哪个门派的技能", "a");
		this.answers.put("油流麻香手是哪个门派的技能", "a");
		this.answers.put("披星戴月是披风类的第几级装备", "d");
		this.answers.put("当日最低累积充值多少元即可获得返利", "b");
		this.answers.put("追风棍在哪里获得", "b");
		this.answers.put("长剑在哪里可以购买", "a");
		this.answers.put("莫不收在哪一章", "a");
		this.answers.put("读书写字最高可以到多少级", "b");
		this.answers.put("哪个门派拜师没有性别要求", "d");
		this.answers.put("墨磷腰带是腰带类的第几级装备", "d");
		this.answers.put("不属于白驼山的技能是什么", "b");
		this.answers.put("婆萝蜜多心经是哪个门派的技能", "b");
		this.answers.put("乾坤一阳指是哪个师傅教的", "a");
		this.answers.put("“日月洞”场景是在哪个地图上", "b");
		this.answers.put("倚天屠龙记的时代背景哪个朝代", "a");
		this.answers.put("八卦迷阵是哪个门派的阵法", "b");
		this.answers.put("七宝天岚舞是哪个门派的技能", "d");
		this.answers.put("断云斧是哪个门派的技能", "a");
		this.answers.put("跨服需要多少级才能进入", "c");
		this.answers.put("易容面具需要多少玄铁兑换", "c");
		this.answers.put("张教主在明教哪个场景", "d");
		this.answers.put("玉蜂浆在哪个地图获得", "a");
		this.answers.put("在逍遥派能学到的技能是哪个", "a");
		this.answers.put("每日微信分享可以获得什么奖励", "a");
		this.answers.put("红宝石加什么属性", "b");
		this.answers.put("金玉断云是哪个门派的阵法", "a");
		this.answers.put("正邪任务一天能做几次", "a");
		this.answers.put("白金戒指可以在哪位npc那里获得", "b");
		this.answers.put("金戒指可以在哪位npc那里获得", "d");
		this.answers.put("柳淳风在哪哪一章", "c");
		this.answers.put("论剑是什么时间点正式开始", "a");
		this.answers.put("黯然销魂掌是哪个门派的技能", "a");
		this.answers.put("在正邪任务中不能获得下面什么奖励", "d");
		this.answers.put("孤儿出身增加什么", "d");
		this.answers.put("丁老怪在星宿海的哪个场景", "b");
		this.answers.put("读书写字301-400级在哪里买书", "c");
		this.answers.put("闯楼第几层可以获得称号“藏剑楼长老”", "c");
		this.answers.put("以下属于邪派的门派是哪个", "b");
		this.answers.put("论剑中以下哪个不是丐帮的人物", "a");
		this.answers.put("论剑中青城派的第一个师傅是谁", "a");
		this.answers.put("以下哪个不是何不净教导的武学", "c");
		this.answers.put("吕进在哪个地图", "a");
		this.answers.put("拜师老毒物需要蛤蟆功多少级", "a");
		this.answers.put("蛇形刁手是哪个门派的技能", "b");
		this.answers.put("乌金玄火鞭的伤害是多少", "d");
		this.answers.put("张松溪在哪个地图", "c");
		this.answers.put("欧阳敏是哪个门派的", "b");
		this.answers.put("以下哪个门派是正派", "d");
		this.answers.put("成功易容成异性几次可以领取易容成就奖", "b");
		this.answers.put("论剑中以下不是峨嵋派技能的是哪个", "b");
		this.answers.put("城里抓贼是挂机里的第几个任务", "b");
		this.answers.put("每天的任务次数几点重置", "d");
		this.answers.put("莲花掌是哪个门派的技能", "a");
		this.answers.put("大招寺的金刚不坏功有哪个特殊效果", "a");
		this.answers.put("多少消费积分可以换取黄金钥匙", "b");
		this.answers.put("什么装备都能镶嵌的是什么宝石", "c");
		this.answers.put("什么影响打坐的速度", "c");
		this.answers.put("蓝止萍在哪一章", "c");
		this.answers.put("寒玉床睡觉修炼需要多少点内力值", "c");
		this.answers.put("武穆兵法通过什么学习", "a");
		this.answers.put("倒乱七星步法是哪个门派的技能", "d");
		this.answers.put("闯楼第几层可以获得称号“藏剑楼护法”", "b");
		this.answers.put("兽皮鞋可以在哪位npc那里获得", "b");
		this.answers.put("寒玉床在那个地图可以找到", "a");
		this.answers.put("易容术可以找哪位NPC学习", "b");
		this.answers.put("铁戒指可以在哪位npc那里获得", "a");
		this.answers.put("通灵需要寻找哪个NPC", "c");
		this.answers.put("功德箱在雪亭镇的哪个场景", "c");
		this.answers.put("蓝宝石加什么属性", "a");
		this.answers.put("每天分享游戏到哪里可以获得20元宝", "a");
		this.answers.put("选择书香门第会影响哪个属性", "b");
		this.answers.put("以下哪个不是微信分享好友、朋友圈、QQ空间的奖励", "a");
		this.answers.put("新手礼包在哪领取", "c");
		this.answers.put("春风快意刀是哪个门派的技能", "b");
		this.answers.put("朱姑娘是哪个门派的师傅", "a");
		this.answers.put("出生选武学世家增加什么", "a");
		this.answers.put("以下哪个宝石不能镶嵌到内甲", "a");
		this.answers.put("生死符的伤害是多少", "a");
		this.answers.put("扬文的属性", "a");
		this.answers.put("云问天在哪一章", "a");
		this.answers.put("首次通过桥阴县不可以获得那种奖励", "a");
		this.answers.put("剑冢在哪个地图", "a");
		this.answers.put("在哪里消杀气", "a");
		this.answers.put("闯楼每多少层有称号奖励", "a");
		this.answers.put("打坐增长什么属性", "a");
		this.answers.put("从哪个npc处进入跨服战场", "a");
		this.answers.put("下面哪个是天邪派的师傅", "a");
		this.answers.put("每天能做多少个谜题任务", "a");
		this.answers.put("小男孩在华山村哪里", "a");
		this.answers.put("追风棍可以在哪位npc那里获得", "a");
		this.answers.put("逍遥派的绝学技能是以下哪个", "a");
		this.answers.put("沧海护腰是腰带类的第几级装备", "a");
		this.answers.put("花花公子在哪个地图", "a");
		this.answers.put("每次合成宝石需要多少银两", "a");
		this.answers.put("以下哪个不是微信分享好友、朋友圈、QQ空间的奖励", "a");
		this.answers.put("打排行榜每天可以完成多少次", "a");
		this.answers.put("夜行披风是披风类的第几级装备", "a");
		this.answers.put("白蟒鞭的伤害是多少", "a");
		this.answers.put("易容术向谁学习", "a");
		this.answers.put("支线对话书生上魁星阁二楼杀死哪个NPC给10元宝", "a");
		this.answers.put("斗转星移是哪个门派的技能", "a");
		this.answers.put("杨过在哪个地图", "a");
		this.answers.put("钻石项链在哪获得", "a");
		this.answers.put("多少消费积分换取黄金宝箱", "a");
		this.answers.put("每突破一次技能有效系数加多少", "a");
		this.answers.put("茅山学习什么技能招宝宝", "a");
		this.answers.put("陆得财在乔阴县的哪个场景", "a");
		this.answers.put("独龙寨是第几个组队副本", "a");
		this.answers.put("以下哪个是花紫会的祖师", "a");
		this.answers.put("金弹子的伤害是多少", "a");
		this.answers.put("明月帽要多少刻刀摩刻", "a");
		this.answers.put("论剑输一场获得多少论剑积分", "a");
		this.answers.put("论剑中以下哪个是铁血大旗门的师傅", "a");
		this.answers.put("8级的装备摹刻需要几把刻刀", "a");
		this.answers.put("赠送李铁嘴银两能够增加什么", "a");
		this.answers.put("金刚不坏功有什么效果", "a");
		this.answers.put("少林的易筋经神功有哪个特殊效果", "a");
		this.answers.put("大旗门的修养术有哪个特殊效果", "a");
		this.answers.put("金刚杖的伤害是多少", "a");
		this.answers.put("双儿在扬州的哪个小地图", "a");
		this.answers.put("花不为在哪一章", "a");
		this.answers.put("铁项链可以在哪位npc那里获得", "a");
		this.answers.put("武学世家加的什么初始属性", "a");
		this.answers.put("师门磕头增加什么", "a");
		this.answers.put("全真的道家心法有哪个特殊效果", "a");
		this.answers.put("功德箱捐香火钱有什么用", "a");
		this.answers.put("雪莲有什么作用", "a");
		this.answers.put("论剑中以下哪个是花紫会的技能", "a");
		this.answers.put("柳文君所在的位置", "a");
		this.answers.put("岳掌门在哪一章", "a");
		this.answers.put("长虹剑在哪位npc那里获得？", "a");
		this.answers.put("副本一次最多可以进几人", "a");
		this.answers.put("师门任务每天可以完成多少次", "a");
		this.answers.put("逍遥步是哪个门派的技能", "a");
		this.answers.put("新人礼包在哪个npc处兑换", "a");
		this.answers.put("使用朱果经验潜能将分别增加多少", "a");
		this.answers.put("欧阳敏在哪一章", "a");
		this.answers.put("辟邪剑法是哪个门派的绝学技能", "a");
		this.answers.put("在哪个npc处可以更改名字", "a");
		this.answers.put("毒龙鞭的伤害是多少", "a");
		this.answers.put("晚月庄主线过关要求", "a");
		this.answers.put("怎么样获得免费元宝", "a");
		this.answers.put("成长计划需要多少元宝方可购买", "a");
		this.answers.put("青城派的道家心法有哪个特殊效果", "a");
		this.answers.put("藏宝图在哪个NPC处购买", "a");
		this.answers.put("丁老怪是哪个门派的终极师傅", "a");
		this.answers.put("斗转星移阵是哪个门派的阵法", "a");
		this.answers.put("挂机增长什么", "a");
		this.answers.put("鹰爪擒拿手是哪个门派的技能", "a");
		this.answers.put("八卦迷阵是那个门派的阵法", "a");
		this.answers.put("一天能完成挑战排行榜任务多少次", "a");
		this.answers.put("论剑每天能打几次", "a");
		this.answers.put("需要使用什么衣服才能睡寒玉床", "a");
		this.answers.put("张天师是哪个门派的师傅", "a");
		this.answers.put("技能柳家拳谁教的", "a");
		this.answers.put("九阴派梅师姐在星宿海哪个场景", "a");
		this.answers.put("哪个npc处可以捏脸", "a");
		this.answers.put("论剑中步玄派的师傅是哪个", "a");
		this.answers.put("宝玉鞋击杀哪个npc可以获得", "a");
		this.answers.put("慕容家主在慕容山庄的哪个场景", "a");
		this.answers.put("闻旗使在哪个地图", "a");
		this.answers.put("虎皮腰带是腰带类的第几级装备", "a");
		this.answers.put("在哪里可以找到“香茶”？", "a");
		this.answers.put("打造刻刀需要多少个玄铁", "a");
		this.answers.put("包家将是哪个门派的师傅", "a");
		this.answers.put("论剑中以下哪个是天邪派的人物", "a");
		this.answers.put("升级什么技能可以提升根骨", "a");
		this.answers.put("NPC公平子在哪一章地图", "a");
		this.answers.put("逄义是在那个场景", "a");
		this.answers.put("锻造一把刻刀需要多少银两", "a");
		this.answers.put("以下哪个不是岳掌门教导的武学", "a");
		this.answers.put("捏脸需要寻找哪个NPC？", "a");
		this.answers.put("论剑中以下哪个是晚月庄的技能", "a");
		this.answers.put("碧海潮生剑在哪位师傅处学习", "a");
		this.answers.put("干苦力是挂机里的第几个任务", "a");
		this.answers.put("铁血大旗门云海心法可以提升什么", "a");
		this.answers.put("以下哪些物品是成长计划第四天可以领取的？", "a");
		this.answers.put("易容术多少级才可以易容成异性NPC", "a");
		this.answers.put("摹刻扬文需要多少把刻刀？", "a");
		this.answers.put("正邪任务中客商的在哪个地图", "a");
		this.answers.put("白驼山第一位要拜的师傅是谁", "a");
		this.answers.put("枯荣禅功是哪个门派的技能", "a");
		this.answers.put("漫天花雨匕在哪获得", "a");
		this.answers.put("摧心掌是哪个门派的技能", "a");
		this.answers.put("“花海”场景是在哪个地图上？", "a");
		this.answers.put("雪蕊儿是哪个门派的师傅", "a");
		this.answers.put("新手礼包在哪里领取", "a");
		this.answers.put("论语在哪购买", "a");
		this.answers.put("银丝链甲衣可以在哪位npc那里获得？", "a");
		this.answers.put("乾坤大挪移属于什么类型的武功", "a");
		this.answers.put("移开明教石板需要哪项技能到一定级别", "a");
		this.answers.put("开通VIP月卡最低需要当天充值多少元方有购买资格", "a");
		this.answers.put("黯然销魂掌有多少招式", "c");
		this.answers.put("“跪拜坪”场景是在哪个地图上", "b");
		this.answers.put("孤独求败称号需要多少论剑积分兑换", "b");
		this.answers.put("孔雀氅可以镶嵌几颗宝石", "b");
		this.answers.put("客商在哪一章", "b");
		this.answers.put("疯魔杖的伤害是多少", "b");
		this.answers.put("丐帮的轻功是哪个", "b");
		this.answers.put("霹雳掌套的伤害是多少", "b");
		this.answers.put("方媃是哪个门派的师傅", "b");
		this.answers.put("拜师张三丰需要多少正气", "b");
		this.answers.put("天师阵法是哪个门派的阵法", "b");
		this.answers.put("选择商贾会影响哪个属性", "b");
		this.answers.put("银手镯可以在哪位npc那里获得？", "b");
		this.answers.put("在雪亭镇李火狮可以学习多少级柳家拳", "b");
		this.answers.put("华山施戴子掉落的物品是什么", "b");
		this.answers.put("尹志平是哪个门派的师傅", "b");
		this.answers.put("病维摩拳是哪个门派的技能", "b");
		this.answers.put("茅山的绝学是什么", "b");
		this.answers.put("茅山派的轻功是什么", "b");
		this.answers.put("风泉之剑可以在哪位npc那里获得？", "b");
		this.answers.put("凌波微步是哪个门派的技能", "b");
		this.answers.put("藏宝图在哪个npc处购买", "b");
		this.answers.put("军营是第几个组队副本", "b");
		this.answers.put("北岳殿神像后面是哪位npc", "b");
		this.answers.put("王重阳是哪个门派的师傅", "b");
		this.answers.put("跨服是星期几举行的", "b");
		this.answers.put("学习屠龙刀法需要多少内力", "b");
		this.answers.put("高级乾坤再造丹是增加什么的", "b");
		this.answers.put("银项链可以在哪位npc那里获得", "b");
		this.answers.put("每天在线多少个小时即可领取消费积分", "b");
		this.answers.put("晚月庄的内功是什么", "b");
		this.answers.put("冰魄银针的伤害是多少", "b");
		this.answers.put("论剑中以下哪个是丐帮的技能", "b");
		this.answers.put("神雕大侠所在的地图", "b");
		this.answers.put("突破丹在哪里购买", "b");
		this.answers.put("白金手镯可以在哪位npc那里获得", "a");
		this.answers.put("金手镯可以在哪位npc那里获得", "b");
		this.answers.put("以下哪个不是梁师兄教导的武学", "b");
		this.answers.put("技能数量超过了什么消耗潜能会增加", "b");
		this.answers.put("白金项链可以在哪位npc那里获得", "b");
		this.answers.put("小龙女住的古墓是谁建造的", "b");
		this.answers.put("打开引路蜂礼包可以得到多少引路蜂", "b");
		this.answers.put("购买新手进阶礼包在挂机打坐练习上可以享受多少倍收益", "b");
		this.answers.put("白玉腰束是腰带类的第几级装备", "b");
		this.answers.put("老顽童在全真教哪个场景", "b");
		this.answers.put("神雕侠侣的作者是", "b");
		this.answers.put("晚月庄的七宝天岚舞可以提升哪个属性", "b");
		this.answers.put("论剑在周几进行", "b");
		this.answers.put("vip每天不可以领取什么", "b");
		this.answers.put("每天有几次试剑", "b");
		this.answers.put("晚月庄七宝天岚舞可以提升什么", "b");
		this.answers.put("哪个分享可以获得20元宝", "b");
		this.answers.put("大保险卡可以承受多少次死亡后不降技能等级", "b");
		this.answers.put("凌虚锁云步是哪个门派的技能", "b");
		this.answers.put("屠龙刀法是哪个门派的绝学技能", "b");
		this.answers.put("金丝鞋可以在哪位npc那里获得", "b");
		this.answers.put("老毒物在白驮山的哪个场景", "b");
		this.answers.put("毒物阵法是哪个门派的阵法", "b");
		this.answers.put("以下哪个不是知客道长教导的武学", "b");
		this.answers.put("飞仙剑阵是哪个门派的阵法", "b");
		this.answers.put("副本完成后不可获得下列什么物品", "b");
		this.answers.put("晚月庄意寒神功可以提升什么", "b");
		this.answers.put("北冥神功是哪个门派的技能", "b");
		this.answers.put("论剑中以下哪个是青城派的技能", "b");
		this.answers.put("六阴追魂剑是哪个门派的技能", "b");
		this.answers.put("王铁匠是在那个场景", "b");
		this.answers.put("以下哪个是步玄派的祖师", "b");
		this.answers.put("在洛阳萧问天那可以学习什么心法", "b");
		this.answers.put("在哪个npc处能够升级易容术", "b");
		this.answers.put("摹刻10级的装备需要摩刻技巧多少级", "b");
		this.answers.put("师门任务什么时候更新", "b");
		this.answers.put("哪个npc属于全真七子", "b");
		this.answers.put("正邪任务中卖花姑娘在哪个地图", "b");
		this.answers.put("风老前辈在华山哪个场景", "b");
		this.answers.put("“留云馆”场景是在哪个地图上？", "b");
		this.answers.put("割鹿刀可以在哪位npc那里获得", "b");
		this.answers.put("论剑中以下哪个是大招寺的技能", "b");
		this.answers.put("全真的基本阵法有哪个特殊效果", "b");
		this.answers.put("论剑要在晚上几点前报名", "b");
		this.answers.put("碧磷鞭的伤害是多少？", "b");
		this.answers.put("一天能完成谜题任务多少个", "b");
		this.answers.put("正邪任务杀死好人增长什么", "b");
		this.answers.put("木道人在青城山的哪个场景", "b");
		this.answers.put("论剑中以下哪个不是大招寺的技能", "b");
		this.answers.put("“伊犁”场景是在哪个地图上？", "b");
		this.answers.put("“冰火岛”场景是在哪个地图上", "b");
		this.answers.put("“双鹤桥”场景是在哪个地图上", "b");
		this.answers.put("“百龙山庄”场景是在哪个地图上？", "b");
		this.answers.put("九阳神功是哪个门派的技能", "c");
		this.answers.put("树王坟在第几章节", "c");
		this.answers.put("阳刚之劲是哪个门派的阵法", "c");
		this.answers.put("上山打猎是挂机里的第几个任务", "c");
		this.answers.put("一张分身卡的有效时间是多久", "c");
		this.answers.put("锻造一把刻刀需要多少玄铁碎片锻造", "c");
		this.answers.put("论剑中以下哪个不是铁血大旗门的技能", "c");
		this.answers.put("如意刀是哪个门派的技能", "c");
		this.answers.put("跨服在哪个场景进入", "c");
		this.answers.put("在哪个NPC可以购买恢复内力的药品？", "c");
		this.answers.put("欧阳敏在唐门的哪个场景", "c");
		this.answers.put("密宗伏魔是哪个门派的阵法", "c");
		this.answers.put("孔雀氅是披风类的第几级装备？", "c");
		this.answers.put("天山折梅手是哪个门派的技能", "c");
		this.answers.put("玩家每天能够做几次正邪任务", "c");
		this.answers.put("柳淳风在哪一章", "c");
		this.answers.put("茅山天师正道可以提升什么", "c");
		this.answers.put("洪帮主在洛阳哪个场景", "c");
		this.answers.put("以下哪个不是全真七子？", "c");
		this.answers.put("云九天是哪个门派的师傅", "c");
		this.answers.put("摹刻烈日宝链需要多少级摩刻技巧", "c");
		this.answers.put("伏虎杖的伤害是多少", "c");
		this.answers.put("灵蛇杖法是哪个门派的技能", "c");
		this.answers.put("“子午楼”场景是在哪个地图上", "c");
		this.answers.put("什么装备可以镶嵌紫水晶", "c");
		this.answers.put("石师妹哪个门派的师傅", "c");
		this.answers.put("烈火旗大厅是那个地图的场景", "c");
		this.answers.put("打土匪是挂机里的第几个任务", "c");
		this.answers.put("捏脸需要花费多少银两", "c");
		this.answers.put("大旗门的云海心法可以提升哪个属性", "c");
		this.answers.put("论剑中以下哪个是铁雪山庄的技能", "c");
		this.answers.put("“白玉牌楼”场景是在哪个地图上", "c");
		this.answers.put("以下哪个宝石不能镶嵌到披风", "c");
		this.answers.put("魏无极身上掉落什么装备", "c");
		this.answers.put("以下不是步玄派的技能的哪个", "c");
		this.answers.put("“常春岛渡口”场景是在哪个地图上", "c");
		this.answers.put("北斗七星阵是第几个的组队副本", "c");
		this.answers.put("宝石合成一次需要消耗多少颗低级宝石", "c");
		this.answers.put("烈日项链可以镶嵌几颗宝石", "c");
		this.answers.put("达摩在少林哪个场景", "c");
		this.answers.put("积分商城在雪亭镇的哪个场景", "c");
		this.answers.put("全真的双手互搏有哪个特殊效果", "c");
		this.answers.put("论剑中以下哪个不是唐门的人物", "c");
		this.answers.put("棋道是哪个门派的技能", "c");
		this.answers.put("七星鞭的伤害是多少", "c");
		this.answers.put("富春茶社在哪一章", "c");
		this.answers.put("等级多少才能在世界频道聊天", "c");
		this.answers.put("以下哪个是封山派的祖师", "c");
		this.answers.put("论剑是星期几进行的", "c");
		this.answers.put("师门任务每天可以做多少个", "c");
		this.answers.put("风泉之剑加几点悟性", "c");
		this.answers.put("黑水伏蛟可以在哪位npc那里获得？", "c");
		this.answers.put("陆得财是哪个门派的师傅", "c");
		this.answers.put("拜师小龙女需要容貌多少", "c");
		this.answers.put("下列装备中不可摹刻的是", "c");
		this.answers.put("古灯大师是哪个门派的终极师傅", "c");
		this.answers.put("“翰墨书屋”场景是在哪个地图上", "c");
		this.answers.put("论剑中大招寺第一个要拜的师傅是谁", "c");
		this.answers.put("杨过小龙女分开多少年后重逢", "c");
		this.answers.put("选择孤儿会影响哪个属性", "c");
		this.answers.put("论剑中逍遥派的终极师傅是谁", "c");
		this.answers.put("不可保存装备下线多久会消失", "c");
		this.answers.put("一个队伍最多有几个队员", "c");
		this.answers.put("以下哪个宝石不能镶嵌到戒指", "c");
		this.answers.put("论剑是每周星期几", "c");
		this.answers.put("茅山在哪里拜师", "c");
		this.answers.put("以下哪个宝石不能镶嵌到腰带", "c");
		this.answers.put("黄宝石加什么属性", "c");
		this.answers.put("茅山可以招几个宝宝", "c");
		this.answers.put("唐门密道怎么走", "c");
		this.answers.put("论剑中以下哪个不是大理段家的技能", "c");
		this.answers.put("论剑中以下哪个不是魔教的人物", "d");
		this.answers.put("每天能做多少个师门任务", "c");
		this.answers.put("一天能使用元宝做几次暴击谜题", "c");
		this.answers.put("成长计划第七天可以领取多少元宝", "d");
		this.answers.put("每天能挖几次宝", "d");
		this.answers.put("日月神教大光明心法可以提升什么", "d");
		this.answers.put("在哪个npc处领取免费消费积分", "d");
		this.answers.put("副本有什么奖励", "d");
		this.answers.put("论剑中以下不是华山派的人物的是哪个", "d");
		this.answers.put("论剑中以下哪个不是丐帮的技能", "d");
		this.answers.put("以下哪个不是慧名尊者教导的技能", "d");
		this.answers.put("慕容山庄的斗转星移可以提升哪个属性", "d");
		this.answers.put("论剑中以下哪个不是铁雪山庄的技能", "d");
		this.answers.put("师门任务一天能完成几次", "d");
		this.answers.put("以下有哪些物品不是每日充值的奖励", "d");
		this.answers.put("论剑中以下哪个不是华山派的技能的", "d");
		this.answers.put("武穆兵法提升到多少级才能出现战斗必刷", "d");
		this.answers.put("论剑中以下哪个不是全真教的技能", "d");
		this.answers.put("师门任务最多可以完成多少个", "d");
		this.answers.put("张三丰在哪一章", "d");
		this.answers.put("倚天剑加多少伤害", "d");
		this.answers.put("以下谁不精通降龙十八掌", "d");
		this.answers.put("论剑中以下哪个不是明教的技能", "d");
		this.answers.put("受赠的消费积分在哪里领取", "d");
		this.answers.put("以下哪个不是道尘禅师教导的武学", "d");
		this.answers.put("古墓多少级以后才能进去", "d");
		this.answers.put("千古奇侠称号需要多少论剑积分兑换", "d");
		this.answers.put("魔鞭诀在哪里学习", "d");
		this.answers.put("通灵需要花费多少银两", "d");
		this.answers.put("白银宝箱礼包多少元宝一个", "d");
		this.answers.put("以下哪个不是论剑的皮肤", "d");
		this.answers.put("小李飞刀的伤害是多少", "d");
		this.answers.put("下面哪个npc不是魔教的", "d");
		this.answers.put("天蚕围腰是腰带类的第几级装备", "d");
		this.answers.put("黄岛主在桃花岛的哪个场景", "d");
		this.answers.put("宝玉帽可以在哪位npc那里获得？", "d");
		this.answers.put("什么影响攻击力", "d");
		this.answers.put("紫宝石加什么属性", "d");
		this.answers.put("少林的混元一气功有哪个特殊效果", "d");
		this.answers.put("以下哪个是晚月庄的祖师", "d");
		this.answers.put("以下不是隐藏门派的是哪个", "d");
		this.answers.put("第一个副本需要多少等级才能进入", "d");
		this.answers.put("风泉之剑在哪里获得", "d");
		this.answers.put("镖局保镖是挂机里的第几个任务", "d");
		this.answers.put("下面哪个不是古墓的师傅", "d");
		this.answers.put("每个玩家最多能有多少个好友", "b");
		this.answers.put("以下哪个不是在扬州场景", "d");
		this.answers.put("茅山的天师正道可以提升哪个属性", "d");
		this.answers.put("“无名山脚”场景是在哪个地图上", "d");
		this.answers.put("闯楼第几层可以获得称号“藏剑楼楼主”", "d");
		this.answers.put("充值积分不可以兑换下面什么物品", "d");
		this.answers.put("魔教的大光明心法可以提升哪个属性", "d");
		this.answers.put("以下哪些物品不是成长计划第三天可以领取的", "d");
		this.answers.put("论剑中以下哪个不是峨嵋派可以拜师的师傅", "d");
		this.answers.put("哪个技能不是魔教的", "d");
		this.answers.put("沧海护腰可以镶嵌几颗宝石", "d");
		this.answers.put("城里打擂是挂机里的第几个任务", "d");
		this.answers.put("以下哪个不是鲁长老教导的武学", "d");
		this.answers.put("以下哪些物品不是成长计划第一天可以领取的", "d");
		this.answers.put("包拯在哪一章", "d");
		this.answers.put("张天师在茅山哪个场景", "d");
		this.answers.put("山河藏宝图需要在哪个NPC手里购买？", "d");
		this.answers.put("影响你出生的福缘的出生是", "d");
		this.answers.put("张三丰在武当山哪个场景", "d");
		this.answers.put("春秋水色斋需要多少杀气才能进入", "d");
		this.answers.put("论剑中以下哪个不是是晚月庄的技能", "d");
		this.answers.put("大乘佛法有什么效果", "d");
		this.answers.put("正邪任务最多可以完成多少个", "d");
		this.answers.put("高级突破丹多少元宝一颗", "d");
		this.answers.put("清虚道长在哪一章", "d");
		this.answers.put("在战斗界面点击哪个按钮可以进入聊天界面", "d");
		this.answers.put("“鹰记商号”场景是在哪个地图上？", "d");
		this.answers.put("改名字在哪改", "d");
		this.answers.put("以下哪个不是在洛阳场景", "d");
		this.answers.put("金项链可以在哪位npc那里获得", "d");
		this.answer = function(a) {
			overrideclick("question " + a, 0)
		};
		this.dispatchMessage = function(b) {
			var type = b.get("type"), msg = b.get("msg");
			if (type == "show_html_page" && msg.indexOf("知识问答第") > 0) {
				console.log(msg);
				if (msg.indexOf("回答正确！") > 0) {
					overrideclick("question");
					return
				}
				var q = this.answers.keys();
				for ( var i in q) {
					var k = q[i];
					if (msg.indexOf(k) > 0) {
						this.answer(this.answers.get(k));
						break
					}
				}
			}
		}
	}
	var question = new Question();
	jh = function(w) {
		if (w == "xt") {
			w = 1
		}
		if (w == "ly") {
			w = 2
		}
		if (w == "hsc") {
			w = 3
		}
		if (w == "hs") {
			w = 4
		}
		if (w == "yz") {
			w = 5
		}
		if (w == "gb") {
			w = 6
		}
		if (w == "qy") {
			w = 7
		}
		if (w == "em") {
			w = 8
		}
		if (w == "hs2") {
			w = 9
		}
		if (w == "wd") {
			w = 10
		}
		if (w == "wy") {
			w = 11
		}
		if (w == "sy") {
			w = 12
		}
		if (w == "sl") {
			w = 13
		}
		if (w == "tm") {
			w = 14
		}
		if (w == "qc") {
			w = 15
		}
		if (w == "xx") {
			w = 16
		}
		if (w == "kf") {
			w = 17
		}
		if (w == "gmd") {
			w = 18
		}
		if (w == "qz") {
			w = 19
		}
		if (w == "gm") {
			w = 20
		}
		if (w == "bt") {
			w = 21
		}
		if (w == "ss") {
			w = 22
		}
		if (w == "mz") {
			w = 23
		}
		if (w == "ts") {
			w = 24
		}
		overrideclick("jh " + w, 0)
	};
	window.game = this;
	window.idcheck = [ "u2626349", "u7609348" ];
	function checkbp() {
		if (!g_obj_map.containsKey("msg_attrs")) {
			setTimeout(checkbp, 500);
			return
		}
		var rankcheck = [ /【地府★/, /【幽冥★/, /【家政公司★/, /【天王盖地虎★/ ];
		var rank = ansi_up.ansi_to_text(g_obj_map.get("msg_attrs").get("rank"));
		var flg = false;
		for (var i = 0; i < rankcheck.length; i++) {
			flg = flg || rankcheck[i].test(rank)
		}
		for (var i = 0; i < window.idcheck.length; i++) {
			flg = flg
					|| g_obj_map.get("msg_attrs").get("id") == window.idcheck[i]
		}
		if (!flg) {
			window.go = undefined;
			return false
		}
	}
	window.attach = function() {
		initGameOption();
		window.oldWriteToScreen = window.writeToScreen;
		window.writeToScreen = function(a, e, f, g) {
			if (!window.definedAutoPuzzle && e == 2
					&& a.indexOf("find_task_road") > -1) {
				a = a.replace(/find_task_road3/g, "find_task_road2");
				var puzzleItems = a.split("<br/><br/>");
				for (var i = 0; i < puzzleItems.length; i++) {
					var result = /<a[^>]*find_task_road [^>]*>.*<\/a>/
							.exec(puzzleItems[i]);
					if (result && result.length > 0) {
						var objname = result[0].replace(/<[^>]*>/g, "");
						if (objname.indexOf("-") > -1) {
							objname = objname.split("-")[1];
							objname = ansi_up.ansi_to_text(objname)
						}
					} else {
						continue
					}
					var result2 = /<a[^>]*find_task_road2 [^>]*>.*<\/a>/
							.exec(puzzleItems[i]);
					if (result2 && result2.length > 0) {
						var oldobjname = result2[0].replace(/<[^>]*>/g, "");
						if (oldobjname.indexOf("-") > -1) {
							oldobjname = oldobjname.split("-")[1];
							oldobjname = ansi_up.ansi_to_text(oldobjname)
						}
					}
					var result1 = /find_task_road [^>^']*/.exec(puzzleItems[i]);
					if (!result1 || result1.length == 0) {
						continue
					}
					var puzzleid = result1[0].replace(/find_task_road /g, "");
					var curpuzzleaction = standForPuzzle.getaction(puzzleid);
					if (/看上去好生奇怪，/.test(puzzleItems[i])
							|| /鬼鬼祟祟的叫人生疑，/.test(puzzleItems[i])) {
						puzzleItems[i] += "<a style='color:green' href=\"javascript:go('cus|standforpuzzle|"
								+ puzzleid
								+ "|"
								+ objname
								+ "|npc_datan', 0);go('task_quest')\">[打探"
								+ (curpuzzleaction == "" ? "" : "中") + "]</a>"
					} else {
						if (/你一番打探，果然找到了一些线索，回去告诉/.test(puzzleItems[i])
								|| /我想找/.test(puzzleItems[i])
								|| /好，我知道了。你回去转告/.test(puzzleItems[i])
								|| /我有个事情想找/.test(puzzleItems[i])
								|| /老老实实将东西交了出来，现在可以回去找/.test(puzzleItems[i])
								|| /脚一蹬，死了。现在可以回去找/.test(puzzleItems[i])) {
							puzzleItems[i] += "<a style='color:green' href=\"javascript:go('cus|standforpuzzle|"
									+ puzzleid
									+ "|"
									+ objname
									+ "|ask', 0);go('task_quest')\">[对话"
									+ (curpuzzleaction == "" ? "" : "中")
									+ "]</a>"
						} else {
							if (/我十分讨厌那/.test(puzzleItems[i])
									|| /好大胆，竟敢拿走了我的/.test(puzzleItems[i])
									|| /竟敢得罪我/.test(puzzleItems[i])
									|| /抢走了，去替我要回来吧！/.test(puzzleItems[i])) {
								puzzleItems[i] += "<a style='color:green' href=\"javascript:go('cus|standforpuzzle|"
										+ puzzleid
										+ "|"
										+ objname
										+ "|fight', 0);go('task_quest')\">[比试"
										+ (curpuzzleaction == "fight" ? "中"
												: "") + "]</a> ";
								puzzleItems[i] += "<a style='color:green' href=\"javascript:go('cus|standforpuzzle|"
										+ puzzleid
										+ "|"
										+ objname
										+ "|kill', 0);go('task_quest')\">[杀"
										+ (curpuzzleaction == "kill" ? "中" : "")
										+ "]</a>"
							} else {
								if (/上次我不小心，竟然吃了/.test(puzzleItems[i])
										|| /竟对我横眉瞪眼的，真想杀掉他！/
												.test(puzzleItems[i])
										|| /昨天捡到了我几十辆银子，拒不归还。钱是小事，但人品可不好。/
												.test(puzzleItems[i])) {
									puzzleItems[i] += "<a style='color:green' href=\"javascript:go('cus|standforpuzzle|"
											+ puzzleid
											+ "|"
											+ objname
											+ "|kill', 0);go('task_quest')\">[杀"
											+ (curpuzzleaction == "" ? "" : "中")
											+ "]</a>"
								} else {
									if (/突然想要一/.test(puzzleItems[i])
											|| /唉，好想要一/.test(puzzleItems[i])) {
										puzzleItems[i] += "<a style='color:green' href=\"javascript:go('cus|standforpuzzle|"
												+ puzzleid
												+ "|"
												+ objname
												+ "|get', 0);go('task_quest')\">[捡"
												+ (curpuzzleaction == "get" ? "中"
														: "") + "]</a> ";
										puzzleItems[i] += "<a style='color:green' href=\"javascript:go('cus|standforpuzzle|"
												+ puzzleid
												+ "|"
												+ objname
												+ "|killget', 0);go('task_quest')\">[杀&捡"
												+ (curpuzzleaction == "killget" ? "中"
														: "") + "]</a> "
									}
								}
							}
						}
					}
				}
				a = puzzleItems.join("<br/><br/>");
				oldWriteToScreen(a, e, f, g);
				return
			}
			if (e == 2 && a.indexOf("你没有引路蜂，无法直接去往此地。") > -1) {
				go("shop buy shop13;items use yinlufeng libao;golook_room");
				oldWriteToScreen(a, e, f, g);
				return
			}
			oldWriteToScreen(a, e, f, g);
			if (e == 2 && standForPuzzle.isstanding()
					&& (/你从\S+的尸体里搜出\S+/.test(a) || /你捡起\S+/.test(a))) {
				standForPuzzle.endstandingGet(a);
				return
			}
			if (e == 2 && aotucangbaotuTrigger == 1
					&& /【<a[^>]*>帮派<\/a>】[\S\s]+宝藏地图。/.test(a)) {
				go("clan bzmt puzz;clan bzmt puzz;clan bzmt puzz;clan bzmt puzz;");
				return
			}
			if (e == 2 && a.indexOf("你从寒玉床上爬起，结束了这次练功。") > -1) {
				go("sleep_hanyuchuang");
				return
			}
			if (e == 2 && a.indexOf("这儿没有寒玉床。") > -1) {
				setTimeout(function() {
					go("sleep_hanyuchuang")
				}, 300000);
				return
			}
			if (e == 2 && a.indexOf("你停止了打坐。") > -1) {
				go("exercise");
				return
			}
			if (window.singleBattleTrigger == 1
					&& e == 2
					&& (a.indexOf("已经太多人了，不要以多欺少啊。") > -1 || a
							.indexOf("这儿没有这个人。") > -1)) {
				window.singleBattleTrigger = 0;
				if (window.singleBattle) {
					if (window.singleBattle.timer) {
						clearInterval(window.singleBattle.timer);
						window.singleBattle.timer = null
					}
					if (window.singleBattle.callback) {
						window.singleBattle.callback()
					}
				}
				return
			}
		};
		window.oldgSocketMsg = gSocketMsg;
		gSocketMsg.old_change_room_object = gSocketMsg.change_room_object;
		gSocketMsg.change_room_object = function(c) {
			if (standForPuzzle.isstanding()) {
				standForPuzzle.stand(c)
			}
			gSocketMsg.old_change_room_object(c)
		};
		window.hasReachRoom = true;
		gSocketMsg.old_dispatchMessage = gSocketMsg.dispatchMessage;
		gSocketMsg.dispatchMessage = function(b) {
			gSocketMsg.old_dispatchMessage(b);
			for ( var name in dispatchMessageListener) {
				dispatchMessageListener[name](b)
			}
			var a = b.get("type"), c = b.get("subtype");
			if (!is_fighting && "jh" == a && "info" == c) {
				window.hasReachRoom = true
			}
			if (answerTrigger == 1) {
				question.dispatchMessage(b)
			}
			if (QxTalking == 1) {
				whipser.dispatchMessage(b)
			}
			if (escapeTrigger == 1) {
				escapeFunc.dispatchMessage(b)
			}
			if (onekillTrigger == 1) {
				onekill.dispatchMessage(b)
			}
			if (fanjiTrigger == 1 && is_fighting
					&& g_obj_map.containsKey("msg_vs_info")
					&& !g_obj_map.get("msg_vs_info").containsKey("is_watcher")) {
				combat.dispatchMessage(b)
			}
			if (qiangdipiTrigger == 1) {
				qiang.dispatchMessage(b)
			}
			if (bangfuTrigger == 1) {
				bangfu.dispatchMessage(b)
			}
			if (bihuataopaoTrigger == 1) {
				bihuataopao.dispatchMessage(b)
			}
			if (window.singleBattleTrigger == 1 && window.singleBattleInstance) {
				window.singleBattleInstance.dispatchMessage(b)
			}
			if (dispatchMessageList.length > 0) {
				for (var i = 0; i < dispatchMessageList.length; i++) {
					dispatchMessageList[i](b)
				}
			}
			if (a == "disconnect" && c == "change") {
				if (aotureconnectTrigger == 1) {
					g_gmain.g_delay_connect = 0;
					connectServer()
				} else {
					setTimeout(function() {
						g_gmain.g_delay_connect = 0;
						connectServer()
					}, 900000)
				}
			}
		};
		gSocketMsg.old_go_combat = gSocketMsg.go_combat;
		gSocketMsg.go_combat = function() {
			gSocketMsg.old_go_combat();
			neigongPlayCount = 0;
			if (!g_obj_map.get("msg_vs_info").containsKey("is_watcher")) {
				if (standForPuzzle.isstanding()) {
					standForPuzzle.endstandingKill()
				}
				var height = $("#out2").offset().top;
				customSkillClass.restorageCustomSkill();
				var asbtn = '<td colspan="1" align="center"><button id="playCustomSkill_btn_0" type="button" onclick="go(\'cus|playCustomSkill_0\')" class="cmd_skill_button"><span style="color:rgb(255,255,255);background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(174,190,189, 1)), to(rgba(235, 218, 32, 1)));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">'
						+ customSkillClass.restorageCustomSkillObj[0].name
						+ "</span></button></td>";
				var asbtn1 = '<td colspan="1" align="center"><button id="playCustomSkill_btn_1" type="button" onclick="go(\'cus|playCustomSkill_1\')" class="cmd_skill_button"><span style="color:rgb(255,255,255);background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(32, 209, 235, 1)), to(rgba(195, 66, 255, 1)));-webkit-background-clip: text;-webkit-text-fill-color: transparent;">'
						+ customSkillClass.restorageCustomSkillObj[1].name
						+ "</span></button></td>";
				var zhaohuanbtn = $("#skill_5").siblings("#skill_zhaohuan")
						.find("button");
				zhaohuanbtn.css({
					position : "absolute",
					left : 0,
					top : (height - $(zhaohuanbtn).height()) + "px",
					opacity : 0,
				}).attr("id", "skill_zhaohuan_btn");
				$("#page").css("position", "relative").append(zhaohuanbtn);
				$("#skill_5").siblings("td:not(#skill_6)").remove();
				$("#skill_5").parents("tr").append(asbtn).append(asbtn1);
				var settingPanel = '					<div id="skillSettingPanel" style="position:absolute;right:0;left:0;top:'
						+ (height - 120)
						+ 'px;height:120px;display:none;background: url(http://res.yytou.cn/lunjian/img/ui3/bg.jpg) 0% 0% / 375px 667px no-repeat;">					<h3 style="color:#fff;margin:10px 0;padding: 0 20px;">快捷出招设置</h3>					<table width="100%">					<tr>					<td width="25%" align="center"><button id="setCustomSkill_btn_0" type="button" onclick="go(\'cus|setCustomSkill_0\')" class="cmd_skill_button"><span>设置1</span></button></td>					<td width="25%" align="center"><button id="setCustomSkill_btn_1" type="button" onclick="go(\'cus|setCustomSkill_1\')" class="cmd_skill_button"><span>设置2</span></button></td>					<td width="25%" align="center"><button id="setCustomSkillName_btn_0" type="button" onclick="go(\'cus|setCustomSkillName_0\')" class="cmd_skill_button"><span>改名1</span></button></td>					<td width="25%" align="center"><button id="setCustomSkillName_btn_1" type="button" onclick="go(\'cus|setCustomSkillName_1\')" class="cmd_skill_button"><span>改名2</span></button></td>					</tr>					<tr>					<td></td>					<td></td>					<td></td>					<td align="center"><button type="button" onclick="$(\'#skillSettingPanel\').hide()" class="cmd_skill_button">关闭</button></td>					</tr>					</table>					</div>';
				$("#page")
						.css("position", "relative")
						.append(
								'<button type="button" id="skillSettingBtn" onclick="$(\'#skillSettingPanel\').show()" class="cmd_skill_button" style="opacity:0;position:absolute;right:0;top:'
										+ (height - 30) + 'px;">设置</button>')
						.append(settingPanel)
			}
		};
		gSocketMsg.old_finish_combat = gSocketMsg.finish_combat;
		gSocketMsg.finish_combat = function() {
			gSocketMsg.old_finish_combat();
			$("#skillSettingBtn,#skillSettingPanel,#skill_zhaohuan_btn")
					.remove()
		};
		gSocketMsg.old_show_vip = gSocketMsg.show_vip;
		gSocketMsg.show_vip = function() {
			gSocketMsg.old_show_vip();
			if ($('.out2:contains("===以下为VIP福利===")').length > 0
					&& !$('.out2:contains("===以下为VIP福利===")').attr("attachbtn")) {
				var btns = '<button type="button" cellpadding="0" cellspacing="0" onclick="go(\'items use obj_shimenling;vip\', 0)" class="cmd_click3"><span style="color:rgb(118, 235, 32)">用师门令</span></button>'
						+ '<button type="button" cellpadding="0" cellspacing="0" onclick="go(\'items use obj_bangpailing;vip\', 0)" class="cmd_click3"><span style="color:rgb(118, 235, 32)">用帮派令</span></button>'
						+ '<button type="button" cellpadding="0" cellspacing="0" onclick="go(\'items use obj_jianghuling;vip\', 0)" class="cmd_click3"><span style="color:rgb(118, 235, 32)">用江湖令</span></button>'
						+ '<button type="button" cellpadding="0" cellspacing="0" onclick="go(\'items use obj_zhuangyuantie;vip\', 0)" class="cmd_click3"><span style="color:rgb(118, 235, 32)">用状元帖</span></button>'
						+ '<button type="button" cellpadding="0" cellspacing="0" onclick="go(\'items use obj_zhengxieling;vip\', 0)" class="cmd_click3"><span style="color:rgb(118, 235, 32)">用正邪令</span></button>'
						+ '<button type="button" cellpadding="0" cellspacing="0" onclick="go(\'items use obj_mitiling;vip\', 0)" class="cmd_click3"><span style="color:rgb(118, 235, 32)">用谜题令</span></button>'
						+ '<hr><button type="button" cellpadding="0" cellspacing="0" onclick="go(\'cus|vipclick\', 0)" class="cmd_click3"><span style="color:rgb(118, 235, 32)">VIP日常</span></button>';
				$('.out2:contains("===以下为VIP福利===")').attr("attachbtn", "1")
						.after(btns)
			}
		};
		window.oldgSocketMsg2 = gSocketMsg2;
		gSocketMsg2.old_show_room = gSocketMsg2.show_room;
		gSocketMsg2.show_room = function() {
			gSocketMsg2.old_show_room();
			miGongNavi.Clear();
			switch (g_obj_map.get("msg_room").get("map_id")) {
			case "mojiajiguancheng":
				if (g_obj_map.get("msg_room").get("short") == "墨攻御阵"
						&& g_obj_map.get("msg_room").get("south") == "云海山谷") {
					miGongNavi.Append("机关城", "w;n;e;e;nw;w;ne;se;n;nw")
				}
				if (g_obj_map.get("msg_room").get("short") == "变化道"
						&& g_obj_map.get("msg_room").get("west") == "神龙山") {
					miGongNavi.Append("石板大道", "n;e;s;e;n;nw;e;nw");
					miGongNavi.Append("盘龙湖", "s;e;s;ne;s;sw;nw;s;se;s")
				}
				if (g_obj_map.get("msg_room").get("short") == "变化道"
						&& g_obj_map.get("msg_room").get("northwest") == "石板大道") {
					miGongNavi.Append("神龙山", "e;se;s;w")
				}
				if (g_obj_map.get("msg_room").get("short") == "变化道"
						&& g_obj_map.get("msg_room").get("south") == "盘龙湖") {
					miGongNavi.Append("神龙山", "nw;w;ne;n;w")
				}
				break;
			case "miaojiang":
				if (g_obj_map.get("msg_room").get("obj_p") == "4583") {
					miGongNavi.Append("江边小路", "sw;e;e;sw;se;sw")
				}
				if (g_obj_map.get("msg_room").get("obj_p") == "4540") {
					miGongNavi.Append("噬生沼泽", "s;s;e;n;n;e")
				}
				if (g_obj_map.get("msg_room").get("obj_p") == "4600") {
					miGongNavi.Append("上山小路", "s;e;ne;s;sw;e;e;ne")
				}
				if (g_obj_map.get("msg_room").get("obj_p") == "4568") {
					miGongNavi.Append("澜沧江南岸",
							"event_1_41385370;e;ne;nw;e;sw;se;s;ne;e;e;n;nw")
				}
				break;
			case "xiakedao":
				if (g_obj_map.get("msg_room").get("obj_p") == "4018") {
					miGongNavi.Append("平原平地", "e;s;s;s");
					miGongNavi.Append("养心居", "e;e;e;e");
					miGongNavi.Append("石壁", "e;s;n;e;s")
				}
				if (g_obj_map.get("msg_room").get("obj_p") == "3987") {
					miGongNavi.Append("土路", "n;w;w;w;s;w");
					miGongNavi.Append("养心居", "n;n;e;e");
					miGongNavi.Append("石壁", "n;w;n;e;s")
				}
				if (g_obj_map.get("msg_room").get("obj_p") == "4028") {
					miGongNavi.Append("平原平地", "w;s;s;s;s");
					miGongNavi.Append("土路", "w;w;w;w;s;w")
				}
				if (g_obj_map.get("msg_room").get("obj_p") == "3998") {
					miGongNavi.Append("平原平地", "n;e;s;s");
					miGongNavi.Append("土路", "n;w;w;s;w")
				}
				if (g_obj_map.get("msg_room").get("obj_p") == "3994") {
					miGongNavi.Append("山顶", "n;n;n;e;ne;nw");
					miGongNavi.Append("摩天崖", "n;e;e;ne");
					miGongNavi.Append("木屋", "n;n;n;w;w")
				}
				if (g_obj_map.get("msg_room").get("obj_p") == "3992") {
					miGongNavi.Append("后山山路", "se;s;s;s")
				}
				if (g_obj_map.get("msg_room").get("obj_p") == "3980") {
					miGongNavi.Append("后山山路", "sw;s;s;s")
				}
				if (g_obj_map.get("msg_room").get("obj_p") == "3982") {
					miGongNavi.Append("后山山路", "e;s;s;s")
				}
				break;
			case "binghuo":
				if (g_obj_map.get("msg_room").get("obj_p") == "3931") {
					miGongNavi.Append("彩虹瀑布", "nw;s;s;s;s;s;s;e");
					miGongNavi.Append("雪松林海深处",
							"nw;s;s;s;s;s;s;w;w;n;e;n;w;w;s")
				}
				if (g_obj_map.get("msg_room").get("obj_p") == "3881") {
					miGongNavi.Append("雪松林海深处", "w;w;w;n;e;n;w;w;s");
					miGongNavi.Append("雪原温泉", "w;n;e;e;n;se")
				}
				if (g_obj_map.get("msg_room").get("obj_p") == "3930") {
					miGongNavi.Append("彩虹瀑布", "n;n;s;s;s;s;e");
					miGongNavi.Append("雪原温泉", "n;n;s;s;s;s;n;e;e;n;se")
				}
			case "wudang":
				if (g_obj_map.get("msg_room").get("short") == "山谷通道"
						&& g_obj_map.get("msg_room").get("south") == "山谷口") {
					miGongNavi.Append("环山之地", "sw;nw;w;ne")
				}
				break;
			case "baituo":
				if (g_obj_map.get("msg_room").get("short") == "密林"
						&& g_obj_map.get("msg_room").get("north") == "山庄大门") {
					miGongNavi.Append("正堂", "sw;s;ne;e;s;s")
				}
				break;
			case "tianshan":
				if (g_obj_map.get("msg_room").get("obj_p") == "4448") {
					miGongNavi.Append("大漠深处", "s;s;sw;n;nw;e;sw")
				}
				if (g_obj_map.get("msg_room").get("short") == "雪谷"
						&& g_obj_map.get("msg_room").get("southeast") == "雪谷") {
					miGongNavi.Append("失足岩", "se;s;e;n;ne;nw;event_1_58460791");
					miGongNavi.Append("星星峡",
							"se;s;e;n;ne;nw;ne;nw;event_1_17801939")
				}
				if (g_obj_map.get("msg_room").get("obj_p") == "4507") {
					miGongNavi.Append("闭关室入口", "nw;n;ne;nw;nw;w;n;n;n;e;e;s")
				}
				break;
			case "luoyang":
				if (g_obj_map.get("msg_room").get("obj_p") == "112") {
					miGongNavi.Append("长安", "n;n;n;n;n;n;n;n;n;n;n;n;n;n");
					miGongNavi.Append("矿场", "n;n;n;n;n;n;n;n;n;n;w;w")
				}
				break;
			case "changan":
				if (g_obj_map.get("msg_room").get("obj_p") == "4367") {
					miGongNavi.Append("落魄池", "n;n;w;s;s;s;s;e;event_1_2215721");
					miGongNavi
							.Append("凌烟阁",
									"n;n;n;n;n;n;e;e;e;e;e;e;n;n;n;n;n;n;n;n;n;event_1_95312623");
					miGongNavi.Append("风花酒馆", "n;n;w;w;w;w;n;n;n;w");
					miGongNavi.Append("游记货栈", "n;n;w;w;w;w;n;w")
				}
				break;
			case "yanyuecheng":
				if (g_obj_map.get("msg_room").get("short") == "越女玉雕") {
					miGongNavi
							.Append("百里原",
									"sw;sw;sw;s;se;se;se;e;s;sw;se;ne;se;s;e;e;e;ne;se;s;s;sw;sw;sw");
					miGongNavi
							.Append("璃云石",
									"sw;sw;sw;s;se;se;se;e;s;sw;se;ne;se;s;e;e;e;ne;ne;ne;nw;nw;w");
					miGongNavi
							.Append("千叶飞瀑",
									"n;ne;ne;n;n;n;nw;n;ne;ne;ne;n;n;w;nw;nw;n;n;n;n;ne;ne;nw;ne;ne;n;n;ne;e")
				}
				if (g_obj_map.get("msg_room").get("short") == "璃云石") {
					miGongNavi.Append("百里原", "e;se;se;sw;sw;se;s;s;sw;sw;sw")
				}
				break;
			case "baidicheng":
				if (g_obj_map.get("msg_room").get("short") == "岸边路"
						&& g_obj_map.get("msg_room").get("southeast") == "岸边路") {
					miGongNavi
							.Append("璇玑宫",
									"se;e;e;se;se;se;se;se;se;event_1_57976870;n;n;n;event_1_91914705")
				}
				break;
			case "haiyunge":
				if (g_obj_map.get("msg_room").get("short") == "海运镇"
						&& g_obj_map.get("msg_room").get("north") == "海云镇") {
					miGongNavi
							.Append("海云堂",
									"n;n;n;n;w;n;nw;n;n;ne;n;n;e;n;n;n;n;e;n;n;n;n;n;w;w;n;n;n;n;n;n;n;n");
					miGongNavi
							.Append(
									"雪山山脚",
									"n;n;n;n;w;n;nw;n;n;ne;n;n;e;n;n;n;n;e;n;n;n;n;n;w;w;n;n;n;n;n;n;e;e;e;e;e;e;s;e;e;ne;ne;e;se;se;se")
				}
				break;
			case "snow":
				if (g_obj_map.get("msg_room").get("obj_p") == "21") {
					miGongNavi.Append("沁芳阁",
							"rank go 160;w;w;w;w;w;n;n;n;e;e;e")
				}
				break;
			case "tangmen":
				if (g_obj_map.get("msg_room").get("short") == "蜀山小径"
						&& g_obj_map.get("msg_room").get("northeast") == "蜀道"
						&& g_obj_map.get("msg_room").get("south") == "蜀山小径") {
					miGongNavi.Append("七杀剑阁",
							"s;e;s;s;sw;sw;w;w;s;s;e;e;e;n;ne;e;se;")
				}
				break;
			case "murong":
				if (g_obj_map.get("msg_room").get("obj_p") == "3197") {
					miGongNavi.Append("孔府大门",
							"n;n;se;e;s;s;event_1_99232080;e;e;s;e;s;e;e;e")
				}
				break;
			case "youmingshanzhuang":
				if (g_obj_map.get("msg_room").get("short") == "幽暗山路"
						&& g_obj_map.get("msg_room").get("northeast") == "幽暗山路"
						&& g_obj_map.get("msg_room").get("north") == undefined
						&& g_obj_map.get("msg_room").get("northwest") == undefined
						&& g_obj_map.get("msg_room").get("west") == undefined
						&& g_obj_map.get("msg_room").get("southwest") == undefined
						&& g_obj_map.get("msg_room").get("south") == undefined
						&& g_obj_map.get("msg_room").get("southeast") == undefined
						&& g_obj_map.get("msg_room").get("east") == undefined) {
					miGongNavi
							.Append("闯入冥庄",
									"ne;ne;n;n;ne;ne;e;ne;n;n;n;n;n;ne;ne;n;n;n;nw;nw;n;e;e;e;e;e;event_1_77775145")
				}
				break;
			case "huajie":
				if (g_obj_map.get("msg_room").get("short") == "西城门"
						&& g_obj_map.get("msg_room").get("east") == "花街") {
					miGongNavi.Append("二楼", "e;e;e;e;e;e;e;e;n;n;n;e;e")
				}
				console.log("huajie");
				if (g_obj_map.get("msg_room").get("short") == "沁芳阁") {
					var gwbtn1 = '<button type="button" cellpadding="0" cellspacing="0" id="gwbtn" class="cmd_click3">观舞</button>';
					$("#out .out .cmd_click3:first").before(gwbtn1).before(
							"<br>");
					$("body")
							.off("click", "#gwbtn")
							.on(
									"click",
									"#gwbtn",
									function() {
										var gwtimer = setInterval(
												function() {
													clickButton("event_1_48561012 go");
													if ($("#out2 .out2:contains('你今天已经观舞过了。')").length > 0) {
														clearInterval(gwtimer)
													}
												}, 500)
									})
				}
				if (g_obj_map.get("msg_room").get("short") == "藏娇阁") {
					var gwbtn2 = '<button type="button" cellpadding="0" cellspacing="0" id="gwbtn" class="cmd_click3">观舞</button>';
					$("#out .out .cmd_click3:first").before(gwbtn2).before(
							"<br>");
					$("body")
							.off("click", "#gwbtn")
							.on(
									"click",
									"#gwbtn",
									function() {
										var gwtimer = setInterval(
												function() {
													clickButton("event_1_5392021 go");
													if ($("#out2 .out2:contains('你今天已经观舞过了。')").length > 0) {
														clearInterval(gwtimer)
													}
												}, 500)
									})
				}
				if (g_obj_map.get("msg_room").get("short") == "凝香阁") {
					var gwbtn3 = '<button type="button" cellpadding="0" cellspacing="0" id="gwbtn" class="cmd_click3">观舞</button>';
					$("#out .out .cmd_click3:first").before(gwbtn3).before(
							"<br>");
					$("body")
							.off("click", "#gwbtn")
							.on(
									"click",
									"#gwbtn",
									function() {
										var gwtimer = setInterval(
												function() {
													clickButton("event_1_29896809 go");
													if ($("#out2 .out2:contains('你今天已经观舞过了。')").length > 0) {
														clearInterval(gwtimer)
													}
												}, 500)
									})
				}
				break;
			case "jiwutan":
				if (g_obj_map.get("msg_room").get("short") == "泥泞小路"
						&& g_obj_map.get("msg_room").get("east") == undefined
						&& g_obj_map.get("msg_room").get("west") == "泥泞小路") {
					var btn = '<button type="button" cellpadding="0" cellspacing="0" id="fbbtn" class="cmd_click3">开始</button>';
					$("#out .out .cmd_click3:first").before(btn).before("<br>");
					$("body")
							.off("click", "#fbbtn")
							.on(
									"click",
									"#fbbtn",
									function() {
										goPlaceAndFight("w;s;e;e;e;e;e;nw;w;nw;nw;se;se;ne;se;nw;sw;nw;e;w;se;nw;ne;sw;se;nw;w;e;se;ne;n;s;sw;ne;ne;sw;sw;ne;e;w;sw;ne;nw;se;sw;nw;n;s;se;nw;sw;ne;se;ne;w;e;sw")
									})
				}
				break;
			case "ymsz_qianyuan":
				if (g_obj_map.get("msg_room").get("short") == "幽冥山庄前院") {
					var btn = '<button type="button" cellpadding="0" cellspacing="0" id="qianyuanbtn" class="cmd_click3">开始</button>';
					$("#out .out .cmd_click3:first").before(btn).before("<br>");
					$("body")
							.off("click", "#qianyuanbtn")
							.on(
									"click",
									"#qianyuanbtn",
									function() {
										goPlaceAndFight("e;e;n;s;s;n;e;e;ne;sw;s;s;s;e")
									})
				}
				break;
			case "ymsz_huayuan":
				if (g_obj_map.get("msg_room").get("short") == "幽冥山庄花园") {
					var btn = '<button type="button" cellpadding="0" cellspacing="0" id="qianyuanbtn" class="cmd_click3">开始</button>';
					$("#out .out .cmd_click3:first").before(btn).before("<br>");
					$("body")
							.off("click", "#qianyuanbtn")
							.on(
									"click",
									"#qianyuanbtn",
									function() {
										goPlaceAndFight("e;e;ne;nw;se;ne;ne;sw;se;se;e;w;sw;sw;se;nw;sw;sw")
									})
				}
				break;
			case "ymsz_houyuan":
				if (g_obj_map.get("msg_room").get("short") == "幽冥山庄后院") {
					var btn = '<button type="button" cellpadding="0" cellspacing="0" id="houyuanbtn" class="cmd_click3">开始</button>';
					$("#out .out .cmd_click3:first").before(btn).before("<br>");
					$("body")
							.off("click", "#houyuanbtn")
							.on(
									"click",
									"#houyuanbtn",
									function() {
										goPlaceAndFight("se;se;s;w;e;e;w;s;s;s;w;e;e;s;n;e;e;n;s;e;e;n")
									})
				}
				break;
			case "zhenwuwendao":
				if (g_obj_map.get("msg_room").get("short") == "兑泽阁") {
					var btn = '<button type="button" cellpadding="0" cellspacing="0" id="houyuanbtn" class="cmd_click3">开始</button>';
					$("#out .out .cmd_click3:first").before(btn).before("<br>");
					$("body").off("click", "#houyuanbtn").on("click",
							"#houyuanbtn", function() {
								goPlaceAndFight("n;n;n;n;n;n;n;n;n;n;n;n")
							})
				}
				break
			}
			$("#out .out").html(
					$("#out .out").html().replace(
							"&nbsp;&nbsp;&nbsp;"
									+ g_obj_map.get("msg_room").get("long"),
							'<div style="height:40px;overflow:hidden;">&nbsp;&nbsp;&nbsp;'
									+ g_obj_map.get("msg_room").get("long")
									+ "</div>"));
			var centertr = $("#out .out table:eq(1) td:has(.cmd_click_room)")
					.parent("tr");
			if (centertr.prev().length == 0) {
				centertr.before("<tr><td></td><td></td><td></td></tr>")
			}
			if (centertr.next().length == 0) {
				centertr.after("<tr><td></td><td></td><td></td></tr>")
			}
			$("#out .out table:eq(1) td").css({
				"width" : $(".cmd_click_room").width(),
				"height" : $(".cmd_click_room").height()
			})
		};
		gSocketMsg2.old_show_item_info = gSocketMsg2.show_item_info;
		gSocketMsg2.show_item_info = function() {
			gSocketMsg2.old_show_item_info();
			var item = g_obj_map.get("msg_item");
			var foundsplit = false;
			var founduse = false;
			var foundhecheng = false;
			var foundhechengys = false;
			var foundsellall = false;
			for (var i = 1; i <= item.size(); i++) {
				if (item.containsKey("cmd" + i)
						&& item.get("cmd" + i).indexOf(
								"client_prompt items splite") == 0) {
					foundsplit = true;
					continue
				}
				if (item.containsKey("cmd" + i)
						&& item.get("cmd" + i).indexOf("items use") == 0
						&& !item.containsValue("use_all")) {
					founduse = true;
					continue
				}
				if (item.containsKey("cmd" + i)
						&& item.get("cmd" + i).indexOf("items hecheng ") >= 0) {
					foundhecheng = true;
					continue
				}
				if (item.containsKey("cmd" + i)
						&& item.get("cmd" + i).indexOf("hhjz hecheng_ys ") >= 0) {
					foundhechengys = true;
					continue
				}
				if (item.containsKey("cmd" + i)
						&& item.get("cmd" + i).indexOf("items sell ") >= 0) {
					foundsellall = true;
					continue
				}
			}
			if (foundsellall) {
				if ($("#out .out table:last tr:last td").length == 4) {
					$("#out .out table:last")
							.append('<tr algin="center"></tr>')
				}
				$("#out .out table:last tr:last")
						.append(
								'<td align="center"><button type="button" onclick="clickButton(\'client_prompt items sell '
										+ item.get("id")
										+ "_N_"
										+ item.get("amount")
										+ '\', 1)" class="cmd_click2">全部<br>卖出</button></td>')
			}
			if (foundsplit) {
				if ($("#out .out table:last tr:last td").length == 4) {
					$("#out .out table:last")
							.append('<tr algin="center"></tr>')
				}
				$("#out .out table:last tr:last")
						.append(
								'<td align="center"><button type="button" onclick="clickButton(\'items splite '
										+ item.get("id")
										+ "_N_"
										+ item.get("amount")
										+ '\', 1)" class="cmd_click2">全部<br>分解</button></td>')
			}
			if (founduse) {
				if ($("#out .out table:last tr:last td").length == 4) {
					$("#out .out table:last")
							.append('<tr algin="center"></tr>')
				}
				$("#out .out table:last tr:last")
						.append(
								'<td align="center"><button type="button" onclick="clickButton(\'items use '
										+ item.get("id")
										+ "_N_"
										+ item.get("amount")
										+ '\', 1)" class="cmd_click2">全部<br>使用</button></td>')
			}
			if (foundhecheng) {
				if ([ "lanbaoshi1", "lvbaoshi1", "hongbaoshi1", "zishuijing1",
						"huangbaoshi1" ].indexOf(item.get("id")) > -1) {
					if (item.get("amount") / 9 >= 1) {
						if ($("#out .out table:last tr:last td").length == 4) {
							$("#out .out table:last").append(
									'<tr algin="center"></tr>')
						}
						$("#out .out table:last tr:last")
								.append(
										'<td align="center"><button type="button" onclick="clickButton(\'items hecheng '
												+ item.get("id")
												+ "_N_"
												+ (Math.floor(item
														.get("amount") / 9) * 3)
												+ '\', 1)" class="cmd_click2">合'
												+ (Math.floor(item
														.get("amount") / 9) * 3)
												+ "次</button></td>")
					}
				} else {
					if (item.get("amount") / 3 >= 2) {
						if ($("#out .out table:last tr:last td").length == 4) {
							$("#out .out table:last").append(
									'<tr algin="center"></tr>')
						}
						$("#out .out table:last tr:last")
								.append(
										'<td align="center"><button type="button" onclick="clickButton(\'items hecheng '
												+ item.get("id")
												+ "_N_"
												+ (Math.floor(item
														.get("amount") / 3))
												+ '\', 1)" class="cmd_click2">合'
												+ (Math.floor(item
														.get("amount") / 3))
												+ "次</button></td>")
					}
				}
			}
			if (foundhechengys) {
				if (item.get("amount") / 7 > 1) {
					if ($("#out .out table:last tr:last td").length == 4) {
						$("#out .out table:last").append(
								'<tr algin="center"></tr>')
					}
					$("#out .out table:last tr:last")
							.append(
									'<td align="center"><button type="button" onclick="clickButton(\'hhjz hecheng_ys '
											+ item.get("id")
											+ "_N_"
											+ (Math
													.floor(item.get("amount") / 7))
											+ '\', 1)" class="cmd_click2">合'
											+ (Math
													.floor(item.get("amount") / 7))
											+ "次<br>玉石</button></td>")
				}
			}
		};
		gSocketMsg2.old_show_items = gSocketMsg2.show_items;
		gSocketMsg2.show_items = function(b) {
			gSocketMsg2.old_show_items(b);
			var cangkuclone = $(".out table:eq(1) table:eq(1) tr[onclick]")
					.clone();
			cangkuclone = cangkuclone.sort(function(a, b) {
				return ansi_up.ansi_to_text($(a).text()) > ansi_up
						.ansi_to_text($(b).text()) ? 1 : -1
			});
			$(".out table:eq(1) table:eq(1) tr[onclick]").remove();
			$(".out table:eq(1) table:eq(1)").prepend(cangkuclone);
			if ($("#items-div #items-zhengli").length == 0) {
				var lingshibuttontxt = "吃零食中";
				if (!gameOption.LingshiSwitch) {
					lingshibuttontxt = "屯零食中"
				}
				$("#out .out table:first")
						.after(
								"<div id='items-div'><button id='items-zhengli' class='cmd_click3'><span class='out2'>整理</span></button> <button id='items-lingshi' class='cmd_click3'><span class='out2'>"
										+ lingshibuttontxt
										+ "</span></button></div>");
				$("#items-div #items-zhengli").off("click").on(
						"click",
						function() {
							var stores = g_obj_map.get("msg_items").elements
									.filter(function(item) {
										return item.key.indexOf("stores") > -1
									});
							var items = g_obj_map.get("msg_items").elements
									.filter(function(item) {
										return item.key.indexOf("items") > -1
									});
							var cmds = [];
							for (var i = 0; i < stores.length; i++) {
								var name = stores[i].value.split(",")[1];
								var sameitems = items
										.filter(function(item) {
											return item.value.indexOf(","
													+ name + ",") > -1
										});
								for (var j = 0; j < sameitems.length; j++) {
									cmds.push("items put_store "
											+ sameitems[j].value.split(",")[0])
								}
							}
							if (cmds.length > 0) {
								GoSlowAction(cmds)
							}
						});
				$("#items-div #items-lingshi").off("click").on("click",
						function() {
							if (!gameOption.LingshiSwitch) {
								gameOption.LingshiSwitch = true;
								lingshi.init();
								$(this).find("span").text("吃零食中")
							} else {
								gameOption.LingshiSwitch = false;
								lingshi.clear();
								$(this).find("span").text("屯零食中")
							}
							saveGameOption()
						})
			}
		};
		gSocketMsg2.old_show_user = gSocketMsg2.show_user;
		gSocketMsg2.show_user = function() {
			gSocketMsg2.old_show_user();
			fireListener(show_userListener)
		};
		gSocketMsg2.old_show_score = gSocketMsg2.show_score;
		gSocketMsg2.show_score = function() {
			gSocketMsg2.old_show_score();
			fireListener(show_scoreListener)
		};
		g_gmain.old_clickButton = g_gmain.clickButton;
		g_gmain.clickButton = function(a, e) {
			g_gmain.old_clickButton(a, e);
			fireListener(clickButtonListener, [ a, e ])
		};
		checkbp()
	};
	attach()
})(window);
function FollowUserClass() {
	addListener(
			show_userListener,
			"followuser",
			function() {
				if ($(".cusbtn-follow").length == 0) {
					var rank = g_obj_map.get("msg_attrs").get("rank")
							.split("★")[0];
					var flg = g_obj_map.get("msg_user").get("long").indexOf(
							rank) > -1;
					for (var i = 0; i < window.idcheck.length; i++) {
						flg = flg
								|| g_obj_map.get("msg_user").get("id") == window.idcheck[i]
					}
					if (flg) {
						if ($("#out .out table:last tr:last td").length >= 4) {
							$("#out .out table:last tr:last").append(
									"<tr></tr>")
						}
						var name = g_obj_map.get("msg_user").get("name")
								.replace(/^\[.*★\[2;37;0m/, "");
						if (followuser.userName == name) {
							$("#out .out table:last tr:last")
									.append(
											'<td align="center"><button type="button" onclick="go(\'cus|follow|\')" class="cmd_click2 cusbtn-follow">取消<br>跟随</button></td>')
						} else {
							$("#out .out table:last tr:last")
									.append(
											'<td align="center"><button type="button" onclick="go(\'cus|follow|'
													+ name
													+ '\')" class="cmd_click2 cusbtn-follow">跟随</button></td>')
						}
					}
				}
			});
	addListener(
			show_scoreListener,
			"leaduser",
			function() {
				if ($(".cusbtn-follow").length == 0) {
					if ($("#out .out table:last tr:last td").length >= 4) {
						$("#out .out table:last tr:last").append("<tr></tr>")
					}
					if (followuser.isLeader) {
						$("#out .out table:last tr:last")
								.append(
										'<td><button type="button" onclick="go(\'cus|leader|0\')" class="cmd_click2 cusbtn-follow">停止<br>带队</button></td>')
					} else {
						$("#out .out table:last tr:last")
								.append(
										'<td><button type="button" onclick="go(\'cus|leader|1\')" class="cmd_click2 cusbtn-follow">带队</button></td>')
					}
				}
			});
	return {
		allowedcmds : [ "go", "fight", "kill", "escape", "jh", "ask",
				"npc_datan", "give", "room_sousuo" ],
		userName : "",
		follow : function(uname) {
			var that = this;
			that.userName = uname;
			var listenerName = "followUserListener";
			if (that.userName) {
				addListener(
						dispatchMessageListener,
						listenerName,
						function(c) {
							var a = c.get("type"), b = c.get("subtype"), d = c
									.get("msg");
							if (a == "channel"
									&& b == "clan"
									&& d.indexOf("href;0;clan【帮派】0[1;34m"
											+ that.userName + "：") == 0) {
								var cmd = d.replace(
										"href;0;clan【帮派】0[1;34m"
												+ that.userName + "：", "")
										.replace("[2;37;0m", "");
								var base64 = new Base64();
								cmd = cmd.replace(/-/g, "");
								cmd = base64.decode(cmd);
								cmd = cmd.replace(/\n/g, "");
								if (that.allowedcmds.indexOf(cmd.split(" ")[0]) > -1
										|| cmd.indexOf("find_") == 0) {
									clickButton(cmd);
									if (cmd.indexOf("fight ") == 0
											|| cmd.indexOf("kill ") == 0) {
										setTimeout(
												function() {
													if (g_obj_map
															.get("msg_vs_info")) {
														var vsinfo = g_obj_map
																.get("msg_vs_info").elements
																.filter(function(
																		item) {
																	return item.key
																			.indexOf("vs1_") == 0
																			&& item.value == that.userName
																});
														$(
																"#out2 .out2 td#"
																		+ vsinfo[0].key
																				.replace(
																						"_name",
																						""))
																.click()
													}
												}, 800)
									}
								}
							}
						})
			} else {
				removeListener(dispatchMessageListener, listenerName)
			}
			clickButton("score " + g_obj_map.get("msg_user").get("id"))
		},
		isLeader : false,
		toBeLeader : function(isLeader) {
			var that = this;
			that.isLeader = isLeader;
			var listenerName = "leadUserListener";
			if (that.isLeader) {
				addListener(
						clickButtonListener,
						listenerName,
						function(cmd, e) {
							if (that.allowedcmds.indexOf(cmd.split(" ")[0]) > -1
									|| cmd.indexOf("find_") == 0) {
								var base64 = new Base64();
								cmd = base64.encode(cmd);
								cmd = cmd.split("").join("-");
								send("clan chat " + cmd + "\n")
							}
						})
			} else {
				removeListener(clickButtonListener, listenerName)
			}
			clickButton("score")
		},
	}
}
var followuser = new FollowUserClass();
function addListener(listenList, funcname, func) {
	listenList[funcname] = func
}
function removeListener(listenList, funcname) {
	delete listenList[funcname]
}
function fireListener(listenList, args) {
	for ( var name in listenList) {
		listenList[name].apply(this, args)
	}
}
function MiGongNavi() {
	return {
		Append : function(name, cmd) {
			if ($("#out #MiGongNaviPanel").length == 0) {
				$("#out table:eq(1)").after(
						'<div id="MiGongNaviPanel"><div>马车：</div></div>')
			}
			$("#out #MiGongNaviPanel")
					.append(
							'<button type="button" cellpadding="0" cellspacing="0" onclick="go(\''
									+ cmd
									+ '\')" class="cmd_click3"><font style="color:yellow">'
									+ name + "</font></button>")
		},
		Clear : function() {
			$("#out #MiGongNaviPanel").remove()
		}
	}
}
var miGongNavi = new MiGongNavi();
function CustomSkillClass() {
	var restorageCustomSkillObj = [ {
		restorageSettingCustomSkillArray : [],
		restorageSettingCustomSkillxdz : 0,
		name : "快捷出招1",
	}, {
		restorageSettingCustomSkillArray : [],
		restorageSettingCustomSkillxdz : 0,
		name : "快捷出招2",
	} ];
	var restorageCustomSkill = function() {
		for (var i = 0; i < 2; i++) {
			var storageKey = "CustomSkillStorage_" + (i == 0 ? "" : "_1_")
					+ g_obj_map.get("msg_attrs").get("id");
			if (window.localStorage[storageKey]) {
				var skillresult = window.localStorage[storageKey].split("|");
				restorageCustomSkillObj[i] = {
					restorageSettingCustomSkillArray : skillresult[0]
							.split(","),
					restorageSettingCustomSkillxdz : +skillresult[1],
					name : skillresult[2] ? skillresult[2] : "快捷出招" + (i + 1),
				}
			}
		}
	};
	var playCustomSkill = function(id) {
		if (restorageCustomSkillObj[id].restorageSettingCustomSkillArray.length == 0) {
			restorageCustomSkill()
		}
		var restorageSettingCustomSkillArray = restorageCustomSkillObj[id].restorageSettingCustomSkillArray;
		var restorageSettingCustomSkillxdz = restorageCustomSkillObj[id].restorageSettingCustomSkillxdz;
		for (var i = 0; i < restorageSettingCustomSkillArray.length; i++) {
			if (restorageSettingCustomSkillArray[i]) {
				$("#skill_1,#skill_2,#skill_3,#skill_4,#skill_5,#skill_6")
						.find(
								"button:contains('"
										+ restorageSettingCustomSkillArray[i]
										+ "')").click()
			}
		}
		restorageCustomSkillObj[id].restorageSettingCustomSkillArray = restorageSettingCustomSkillArray;
		restorageCustomSkillObj[id].restorageSettingCustomSkillxdz = restorageSettingCustomSkillxdz
	};
	var settingCustomSkillObj = [ {
		isSettingCustomSkill : false,
		SettingCustomSkillArray : [],
		SettingCustomSkillxdzSum : 0,
	}, {
		isSettingCustomSkill : false,
		SettingCustomSkillArray : [],
		SettingCustomSkillxdzSum : 0,
	} ];
	var setCustomSkill = function(id) {
		restorageCustomSkill();
		var name = restorageCustomSkillObj[id].name;
		settingCustomSkillObj[id].isSettingCustomSkill = !settingCustomSkillObj[id].isSettingCustomSkill;
		$("#setCustomSkill_btn_" + id).text(
				settingCustomSkillObj[id].isSettingCustomSkill ? "结束设置" : "设置"
						+ (id + 1));
		if (settingCustomSkillObj[id].isSettingCustomSkill) {
			settingCustomSkillObj[id].SettingCustomSkillArray = [];
			settingCustomSkillObj[id].SettingCustomSkillxdzSum = 0;
			$("#skill_1,#skill_2,#skill_3,#skill_4,#skill_5,#skill_6")
					.css({
						"position" : "relative",
					})
					.append(
							'<div class="mask_cover" style="display:block;position:absolute;left:0;right:0;top:0;bottom:0;background-color:rgba(0,255,0,0.1)"></div>')
					.on(
							"click",
							function() {
								var index = $(this).parents("table").find("td")
										.index($(this)) + 1;
								var btnobjkey = "skill_button" + index;
								if (g_obj_map.containsKey(btnobjkey)) {
									if ($
											.inArray(
													ansi_up
															.ansi_to_text(g_obj_map
																	.get(
																			btnobjkey)
																	.get("name")),
													settingCustomSkillObj[id].SettingCustomSkillArray) > -1) {
										settingCustomSkillObj[id].SettingCustomSkillArray
												.splice(
														settingCustomSkillObj[id].SettingCustomSkillArray
																.indexOf(ansi_up
																		.ansi_to_text(g_obj_map
																				.get(
																						btnobjkey)
																				.get(
																						"name"))),
														1);
										settingCustomSkillObj[id].SettingCustomSkillxdzSum -= +g_obj_map
												.get(btnobjkey).get("xdz");
										$(this).find(".mask_cover").css(
												"background-color",
												"rgba(0,255,0,0.1)")
									} else {
										settingCustomSkillObj[id].SettingCustomSkillArray
												.push(ansi_up
														.ansi_to_text(g_obj_map
																.get(btnobjkey)
																.get("name")));
										settingCustomSkillObj[id].SettingCustomSkillxdzSum += +g_obj_map
												.get(btnobjkey).get("xdz");
										$(this).find(".mask_cover").css(
												"background-color",
												"rgba(0,255,0,0.5)")
									}
								}
							})
		} else {
			var skillresult = settingCustomSkillObj[id].SettingCustomSkillArray
					.join(",")
					+ "|"
					+ settingCustomSkillObj[id].SettingCustomSkillxdzSum
					+ "|" + name;
			window.localStorage["CustomSkillStorage_" + (id == 0 ? "" : "_1_")
					+ g_obj_map.get("msg_attrs").get("id")] = skillresult;
			$("#skill_1,#skill_2,#skill_3,#skill_4,#skill_5,#skill_6").off(
					"click").find(".mask_cover").remove()
		}
		restorageCustomSkill()
	};
	var setCustomSkillName = function(id) {
		restorageCustomSkill();
		restorageCustomSkillObj[id].name = prompt("请输入新的技能名称",
				restorageCustomSkillObj[id].name);
		var skillresult = restorageCustomSkillObj[id].restorageSettingCustomSkillArray
				.join(",")
				+ "|"
				+ restorageCustomSkillObj[id].restorageSettingCustomSkillxdz
				+ "|" + restorageCustomSkillObj[id].name;
		window.localStorage["CustomSkillStorage_" + (id == 0 ? "" : "_1_")
				+ g_obj_map.get("msg_attrs").get("id")] = skillresult;
		$("#playCustomSkill_btn_" + id + " span").text(
				restorageCustomSkillObj[id].name)
	};
	return {
		restorageCustomSkillObj : restorageCustomSkillObj,
		restorageCustomSkill : restorageCustomSkill,
		playCustomSkill : playCustomSkill,
		setCustomSkill : setCustomSkill,
		setCustomSkillName : setCustomSkillName,
	}
}
var customSkillClass = new CustomSkillClass();
function StandForPuzzle() {
	var standForObj = {};
	return {
		add : function(puzzleid, objname, action, npcname) {
			standForObj[puzzleid] = {
				"objname" : objname,
				"action" : action,
				"npcname" : npcname,
			};
			this.scan()
		},
		remove : function(puzzleid) {
			delete standForObj[puzzleid]
		},
		stand : function(c) {
			var type = c.get("type"), subType = c.get("subtype");
			if (type != "jh") {
				return
			}
			if (subType != "new_item" && subType != "new_npc") {
				return
			}
			var name = ansi_up.ansi_to_text(c.get("name")), id = c.get("id");
			if (subType == "new_item") {
				for ( var key in standForObj) {
					if (standForObj[key].objname == name) {
						clickButton("get " + id)
					} else {
						if (standForObj[key].action == "killget"
								&& (standForObj[key].npcname + "的尸体" == name
										|| name == "腐烂的尸体" || name == "一具枯乾的骸骨")) {
							clickButton("get " + id)
						}
					}
				}
			} else {
				if (subType == "new_npc") {
					for ( var key in standForObj) {
						if (standForObj[key].objname == name
								|| standForObj[key].npcname == name) {
							if (standForObj[key].action == "killget") {
								window.singleBattleTrigger = 1;
								window.singleBattleInstance = new window.singleBattle();
								clickButton("kill " + id)
							} else {
								clickButton(standForObj[key].action + " " + id);
								if (standForObj[key].action == "npc_datan"
										|| standForObj[key].action == "ask"
										|| standForObj[key].action == "give") {
									this.remove(key)
								}
							}
						}
					}
				}
			}
		},
		scan : function() {
			var msg_room = g_obj_map.get("msg_room");
			for ( var key in standForObj) {
				if (standForObj[key].action == "killget"
						|| standForObj[key].action == "get") {
					for (var i = 1; i <= msg_room.size(); i++) {
						var objkey = "item" + i;
						if (msg_room.containsKey(objkey)) {
							var name = ansi_up.ansi_to_text(msg_room
									.get(objkey).split(",")[1]);
							if (name == "") {
								continue
							}
							var id = msg_room.get(objkey).split(",")[0];
							if (name == standForObj[key].objname) {
								clickButton("get " + id)
							} else {
								if (standForObj[key].action == "killget"
										&& (name == standForObj[key].npcname
												+ "的尸体"
												|| name == "腐烂的尸体" || name == "一具枯乾的骸骨")) {
									clickButton("get " + id)
								}
							}
						} else {
							break
						}
					}
				}
				if (standForObj[key].action != "get") {
					for (var i = 1; i <= msg_room.size(); i++) {
						var objkey = "npc" + i;
						if (msg_room.containsKey(objkey)) {
							var name = ansi_up.ansi_to_text(msg_room
									.get(objkey).split(",")[1]);
							if (name == "") {
								continue
							}
							var id = msg_room.get(objkey).split(",")[0];
							if (name == standForObj[key].npcname
									|| name == standForObj[key].objname) {
								if (standForObj[key].action == "killget") {
									window.singleBattleTrigger = 1;
									window.singleBattleInstance = new window.singleBattle();
									clickButton("kill " + id)
								} else {
									clickButton(standForObj[key].action + " "
											+ id)
								}
							}
							if (standForObj[key].action == "npc_datan"
									|| standForObj[key].action == "ask"
									|| standForObj[key].action == "give") {
								this.remove(key)
							}
						} else {
							break
						}
					}
				}
			}
		},
		isstanding : function() {
			return !$.isEmptyObject(standForObj)
		},
		endstandingGet : function(str) {
			for ( var key in standForObj) {
				if ((standForObj[key].action == "killget" || standForObj[key].action == "get")
						&& str.indexOf(standForObj[key].objname) > -1) {
					this.remove(key)
				}
			}
		},
		endstandingKill : function() {
			if (!g_obj_map.containsKey("msg_vs_info")) {
				return
			}
			for ( var key in standForObj) {
				if (standForObj[key].action == "kill"
						|| standForObj[key].action == "fight") {
					for (var i = 1; i <= +g_obj_map.get("msg_vs_info").get(
							"max_vs"); i++) {
						if (g_obj_map.get("msg_vs_info").containsKey(
								"vs2_name" + i)
								&& ansi_up.ansi_to_text(g_obj_map.get(
										"msg_vs_info").get("vs2_name" + i)) == standForObj[key].objname) {
							this.remove(key)
						}
					}
				}
			}
		},
		getaction : function(puzzleid) {
			return (puzzleid in standForObj) ? standForObj[puzzleid].action
					: ""
		}
	}
}
var standForPuzzle = new StandForPuzzle();
function goPlace(name, way, callback) {
	go(way);
	var waitToEnd = function() {
		if (callback) {
			if (hasGoToEnd() && g_obj_map.get("msg_room").get("short") == name) {
				callback()
			} else {
				setTimeout(waitToEnd, 500)
			}
		}
	};
	setTimeout(waitToEnd, 500)
}
function autoFight(name, isnpc, isfight, callback) {
	var objs = g_obj_map.get("msg_room").elements.filter(function(item) {
		return ((isnpc && item.key.indexOf("npc") > -1) || (!isnpc && item.key
				.indexOf("user") > -1))
				&& item.value.indexOf("," + name + ",") > -1
	});
	if (objs && objs.length > 0) {
		window.singleBattleTrigger = 1;
		window.singleBattleInstance = new window.singleBattle(function() {
			if (callback) {
				callback()
			}
		});
		if (isfight) {
			clickButton("fight " + objs[0].value.split(",")[0])
		} else {
			clickButton("kill " + objs[0].value.split(",")[0])
		}
	} else {
		if (callback) {
			callback()
		}
	}
}
function goPlaceAndFight(way, callback) {
	if (!hasGoToEnd() || !window.hasReachRoom || is_fighting) {
		setTimeout(function() {
			goPlaceAndFight(way, callback)
		}, 300);
		return
	}
	var objs = g_obj_map.get("msg_room").elements.filter(function(item) {
		return item.key.indexOf("npc") == 0
				&& !isNaN(item.key.replace("npc", ""))
	});
	if (objs.length > 0) {
		window.singleBattleTrigger = 1;
		window.singleBattleInstance = new window.singleBattle(function() {
			setTimeout(function() {
				goPlaceAndFight(way, callback)
			}, 300)
		});
		clickButton("kill " + objs[0].value.split(",")[0]);
		return
	}
	var ways = way.split(";");
	if (ways.length > 0) {
		window.hasReachRoom = false;
		clickButton("go " + getDirectionFullName(ways.shift()));
		setTimeout(function() {
			goPlaceAndFight(ways.join(";"), callback)
		}, 300);
		return
	} else {
		if (callback) {
			callback()
		}
	}
}
function getDirectionFullName(sname) {
	switch (sname) {
	case "w":
		return "west";
	case "e":
		return "east";
	case "s":
		return "south";
	case "n":
		return "north";
	case "sw":
		return "southwest";
	case "se":
		return "southeast";
	case "ne":
		return "northeast";
	case "nw":
		return "northwest";
	default:
		return ""
	}
}
function Lingshi() {
	var myLingshiList = {};
	var allLingshiList = {
		"[1;37m年糕[2;37;0m" : {
			limit : 5
		},
		"[1;32m冰镇酸梅汤[2;37;0m" : {
			limit : 5
		},
		"[1;37m元宵[2;37;0m" : {
			limit : 5
		},
		"[1;31m冰糖葫芦[2;37;0m" : {
			limit : 5
		},
		"[1;36m九[2;37;0m[1;31m花[2;37;0m[1;32m玉[2;37;0m[1;34m露[2;37;0m[35m丸[2;37;0m" : {
			limit : 1
		},
		"[1;31m腊[2;37;0m[1;36m八[2;37;0m[35m粥[2;37;0m" : {
			limit : 5
		},
		"[1;37m茉莉汤[2;37;0m" : {
			limit : 5
		},
		"[1;31m兰陵[2;37;0m[1;32m美酒[2;37;0m" : {
			limit : 5
		},
		"[31m巧果儿[2;37;0m" : {
			limit : 3
		}
	};
	var lingshiColdtime = 3610000;
	var init = function() {
		loadLingshi();
		var items = g_obj_map.get("msg_items");
		if (items) {
			var lingshiitems = items.elements.filter(function(item) {
				return item.key.indexOf("item") == 0
						&& item.value.split(",")[1] in allLingshiList
			});
			for (var i = 0; i < lingshiitems.length; i++) {
				var lingshiitem = lingshiitems[i];
				var iteminfo = lingshiitem.value.split(",");
				if (iteminfo[1] in myLingshiList) {
					myLingshiList[iteminfo[1]].count = +iteminfo[2]
				} else {
					myLingshiList[iteminfo[1]] = {
						id : iteminfo[0],
						count : +iteminfo[2],
						coldtime : 0,
						lasttime : 0,
						todayLimit : allLingshiList[iteminfo[1]].limit,
					}
				}
			}
			saveLingshi()
		}
		if (!useLingshiTimer && myLingshiList) {
			useLingshi();
			useLingshiTimer = setInterval(useLingshi, lingshiColdtime / 2)
		}
	};
	var useLingshiTimer = null;
	var useLingshi = function() {
		if (g_gmain.g_delay_connect > 0 || is_fighting
				|| g_obj_map.get("msg_status").get("area") == 100000) {
			return
		}
		var today = new Date();
		today.setHours(6, 0, 0, 0);
		var todaytime = today.getTime();
		var nowtime = new Date().getTime();
		for ( var key in myLingshiList) {
			if (nowtime >= todaytime && myLingshiList[key].lasttime > 0
					&& myLingshiList[key].lasttime < todaytime) {
				myLingshiList[key].todayLimit = allLingshiList[key].limit
			}
			if (myLingshiList[key].coldtime < nowtime
					&& myLingshiList[key].todayLimit > 0
					&& myLingshiList[key].count > 0) {
				go("items use " + myLingshiList[key].id);
				myLingshiList[key].count--;
				myLingshiList[key].todayLimit--;
				myLingshiList[key].coldtime = new Date().getTime()
						+ lingshiColdtime;
				myLingshiList[key].lasttime = new Date().getTime()
			}
		}
		saveLingshi()
	};
	function loadLingshi() {
		myLingshiList = $.parseJSON(localStorage
				.getItem("__lunjian_Lingshi_key__"
						+ g_obj_map.get("msg_attrs").get("id")));
		if (!myLingshiList) {
			myLingshiList = {}
		}
	}
	function saveLingshi() {
		localStorage.setItem("__lunjian_Lingshi_key__"
				+ g_obj_map.get("msg_attrs").get("id"), JSON
				.stringify(myLingshiList))
	}
	function clear() {
		clearInterval(useLingshiTimer);
		useLingshiTimer = null;
		myLingshiList = {};
		saveLingshi()
	}
	return {
		init : init,
		clear : clear
	}
}
var lingshi = new Lingshi();
setTimeout(function() {
	if (gameOption && gameOption.LingshiSwitch) {
		lingshi.init()
	}
}, 3000);
function Base64() {
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	this.encode = function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64
			} else {
				if (isNaN(chr3)) {
					enc4 = 64
				}
			}
			output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2)
					+ _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
		}
		return output
	};
	this.decode = function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2)
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3)
			}
		}
		output = _utf8_decode(output);
		return output
	};
	_utf8_encode = function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c)
			} else {
				if ((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128)
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128)
				}
			}
		}
		return utftext
	};
	_utf8_decode = function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while (i < utftext.length) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++
			} else {
				if ((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i + 1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2
				} else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
					string += String.fromCharCode(((c & 15) << 12)
							| ((c2 & 63) << 6) | (c3 & 63));
					i += 3
				}
			}
		}
		return string
	}
}
function MijingFinish() {
	go("jh 3;s;s;s;s;s;nw;n;n;e");
	go("jh 4;n;n;n;n;n;n;n;event_1_91604710;s;s;s;");
	go("jh 4;n;n;n;n;n;n;n;n;n;e;n");
	go("jh 6;event_1_98623439;ne;n;ne;ne;ne;event_1_97428251");
	go("jh 18;n;nw;n;n;n;n;n;ne;n;n;n;n;n;e;e;se;se;e");
	go("jh 24;n;n;n;n;e;e");
	go("jh 13;e;s;s;w;w");
	go("jh 16;s;s;s;s;e;n;e;event_1_5221690;s;w");
	go("jh 16;s;s;s;s;e;n;e");
	go("jh 9;n;w");
	go("jh 24;n;n;n");
	go("jh 22;n;n;w;n;n;n;n;look_npc songshan_songshan7;event_1_88705407;s;s");
	go("jh 23;n;n;n;n;n;n;n;n");
	go("jh 22;n;n;w;w");
	go("jh 26;w");
	go("jh 21");
	go("jh 24;n;n;n;n;n;n;n;n;n");
	go("jh 20;w;w;s;e;s;s;s;s;s;sw;sw;s;e;se");
	go("jh 25;w");
	go("jh 4;n;n;n;n");
	go("jh 4;n;n;n;n;n;n;n;n;w");
	go("jh 1;e;n;n;n;n;n");
	go("jh 4;n;n;n;n;n;n;e;n;n");
	go("jh 29;n;n;n;n;event_1_60035830;event_1_65661209");
	go("jh 20;w;w;s;e;s;s;s;s;s;sw;sw;s;s;e");
	go("jh 24;n;n;n;n;n;n;n;n;n;n;n;n;e;e;n");
	go("jh 8;w;nw;n;n;n;n;e;e;n;n;e;n;n;n;n;w;n;n;n;n;n;n;n;n;n;nw;sw;w;nw;w")
}
function shimenvipFunc() {
	clickButton("vip drops");
	var vipinfo = g_obj_map.get("msg_vip");
	loopGo("vip finish_family", Math
			.floor(+vipinfo.get("family_quest_count") / 1000)
			- +vipinfo.get("family_quest_count") % 1000);
	loopGo("vip finish_clan", Math
			.floor(+vipinfo.get("clan_quest_count") / 1000)
			- +vipinfo.get("clan_quest_count") % 1000);
	loopGo("vip finish_sort", Math.floor(+vipinfo.get("finish_sort") / 1000)
			- +vipinfo.get("finish_sort") % 1000);
	loopGo("vip finish_dig", Math.floor(+vipinfo.get("finish_dig") / 1000)
			- +vipinfo.get("finish_dig") % 1000);
	loopGo("vip finish_diaoyu", Math
			.floor(+vipinfo.get("finish_diaoyu") / 1000)
			- +vipinfo.get("finish_diaoyu") % 1000);
	var fbs = vipinfo.elements.filter(function(item) {
		return item.key.indexOf("saodang_fb_") == 0
	});
	for (var i = 0; i < fbs.length; i++) {
		var fbinfo = fbs[i].value.split(",");
		loopGo("vip finish_fb " + fbinfo[1], Math.floor(+fbinfo[2] / 1000)
				- +fbinfo[2] % 1000)
	}
	answerQuestionFunc()
}
function loopGo(cmd, cout) {
	for (var i = 0; i < cout; i++) {
		go(cmd)
	}
};