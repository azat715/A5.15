const dataURL = "https://api.jsonbin.io/b/5e905926172eb643896166e7";

// const raw = `{"text":["Жили-были {var1} да {var2}","Была у них {var3}","Снесла {var3} {var4}, не простое - золотое","- {var1} бил, бил - не разбил","- {var2} била, била - не разбила","{var5} бежала, {var6} задела, {var4} упало и разбилось.","{var1} плачет, {var2} плачет, а {var3} кудахчет:","{speach}"]}`

function fetch(url) {
  const request = $.getJSON(url, function(data, textStatus) {
    console.log('Status', textStatus);
    return data;
  })
    .fail(function(jqxhr, textStatus, error) {
      const err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
      return false;
  });
};

function getText(dataURL) {
  let message = fetch(dataURL)
  if (message) {
    message = JSON.parse(message);
    return message['text'];
  }
  else {
    message = `Сервер не отдал данные`;
    return message;
 }
}

function format(source, params) {
  pattern = ['{var1}', '{var2}', '{var3}', '{var4}', '{var5}', '{var6}', '{speach}']
  pattern.forEach((element, index) => {
    regexp = new RegExp(element, 'gm');
    source = source.replace(regexp, String(params[index]))
  });
  //console.log(source);
  return source;
}

function handleButton() {
  let message = fetch(dataURL)
  if (message) {
    message = JSON.parse(message);
    $(result).html(message['text']);
  }
  else {
    let message = `Сервер не отдал данные`;
    $(result).html(message);
 }
};

function handleData() {
  const var1 = $("input[name=var1]")[0].value;
  const var2 = $("input[name=var2]")[0].value;
  const var3 = $("input[name=var3]")[0].value;
  const var4 = $("input[name=var4]")[0].value;
  const var5 = $("input[name=var5]")[0].value;
  const var6 = $("input[name=var6]")[0].value;
  const speach = $("input[name=speach]")[0].value;
  let text = `Жили-были {var1} да {var2}","Была у них {var3}","Снесла {var3} {var4}, не простое - золотое","- {var1} бил, бил - не разбил","- {var2} била, била - не разбила","{var5} бежала, {var6} задела, {var4} упало и разбилось.","{var1} плачет, {var2} плачет, а {var3} кудахчет:","{speach}`;

  text = format(text, [var1, var2, var3, var4, var5, var6, speach])
  //console.log(text)
	$("#result").text(text);
}

function init() {
  $("#button-fetch").click(handleButton);
  $("#button-change").click(handleData);
}

$(document).ready(init);
