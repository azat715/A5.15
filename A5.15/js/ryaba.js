const dataURL = "https://api.jsonbin.io/b/5f1759b5c1edc466175baf5f";
//const dataURL = "http://httpbin.org/status/500";
const pattern = ['{var1}', '{var2}', '{var3}', '{var4}', '{var5}', '{var6}', '{speach}']

const request = $.getJSON(dataURL, function(_, textStatus) {
  console.log('Status', textStatus);
})
  .fail(function(_, textStatus, error) {
    const err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
    const message = `Сервер не отдал данные`;
    $(result).html(message);
});

function format(source, params) {
  source = String(source)
  pattern.forEach((element, index) => {
    regexp = new RegExp(element, 'gm');
    source = source.replace(regexp, String(params[index]))
  });
  //console.log(source);
  return source;
}

function handleButton() {
  request.done(function(data) {
    const text = data['text'];
    $(result).html(`<p>${text}</p>`);
  }
  );
};

function handleData() {
  const var1 = $("input[name=var1]")[0].value;
  const var2 = $("input[name=var2]")[0].value;
  const var3 = $("input[name=var3]")[0].value;
  const var4 = $("input[name=var4]")[0].value;
  const var5 = $("input[name=var5]")[0].value;
  const var6 = $("input[name=var6]")[0].value;
  const speach = $("input[name=speach]")[0].value;
  request.done(function(data) {
    let text = data['text'];
    text = format(data['text'], [var1, var2, var3, var4, var5, var6, speach]);
    $("#result").html(`<p>${text}</p>`);
  }
  );
};

function init() {
  $("#button-fetch").click(handleButton);
  $("#button-change").click(handleData);
}

$(document).ready(function() {
  console.log('ready!');
  init()
});