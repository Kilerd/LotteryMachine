var g_Interval = 1;
var g_PersonCount = 1000; //投掷数字， 产生随机数 0 - g_PersonCount
var g_Timer;
var running = false;
// g-award 是指设置的奖项， award_name 指 该奖项的名称， award_percent 指 该奖项占的百分比 e.g.  5% 就写 5   25% 就写 25

/*	Notice
	
	程序使用电脑随机数
	
	并不能保证在少量数中保证 奖项出现的百分比为你设置的数值

	当然当投掷次数足够大时才能保证

	故，慎重设置百分比
*/
// 如需要 添加或删除 某个奖项 ，请照葫芦画瓢
var g_award = [
	{"award_name":"特等奖","award_percent":5},
	{"award_name":"一等奖","award_percent":10},
	{"award_name":"二等奖","award_percent":10},
	{"award_name":"参与奖","award_percent":50}
];
var looper = 0;

for(looper=0;looper<g_award.length;looper++){
	var per = g_PersonCount / 100;
	if(looper == 0){
		g_award[looper]["min"] = 0;
		g_award[looper]["max"] = g_award[looper]["award_percent"] * per;
	}else{
		g_award[looper]["min"] = g_award[looper-1]["max"]+1;
		g_award[looper]["max"] = g_award[looper]["min"] + g_award[looper]["award_percent"] * per;

	}
		g_award[looper]["award_num"] = 0;
}
function beginRndNum(trigger){
	if(running){
		running = false;
		clearTimeout(g_Timer);		
		$(trigger).val("开始");

	}
	else{
		running = true;
		$(trigger).val("停止");
		beginTimer();
	}
}

function updateRndNum(){
	var num = Math.floor(Math.random()*g_PersonCount+1);
	var looper = 0;
	var is_award = false;
	for(looper=0;looper<g_award.length;looper++){
		if (num > g_award[looper]['min'] && num <= g_award[looper]['max']){
			//$('#ResultNum').html(num + g_award[looper]['award_name'] );
			$('#ResultNum').html(g_award[looper]['award_name']);
			$('#ResultNum').css('color','red');
			//console.log(num + g_award[looper]['award_name']);
			//g_award[looper]['award_num']++;
			is_award = true;
		}

	}

	if(!is_award){
		$('#ResultNum').html("未中奖");
		$('#ResultNum').css('color','#40AA53');
		//console.log(num + "未中奖");

	}
	for(looper=0;looper<g_award.length;looper++){
		//console.log(g_award[looper]['award_name'] + " : " + g_award[looper]['award_num'])
	}



}

function beginTimer(){
	g_Timer = setTimeout(beat, g_Interval);
}

function beat() {
	g_Timer = setTimeout(beat, g_Interval);
	updateRndNum();
}