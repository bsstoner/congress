var _ = require('underscore');

module.exports = {

  isSenator: function(record){
    if(!record.terms || !record.terms.length){ return false; }
    for(var i=0;i<record.terms.length;i++){
      if(record.terms[i].type && record.terms[i].type === 'sen'){
        return true;
      }
    }

    return false;
  },

  getBestId: function(record){
    return record.id.bioguide || record.id.govtrack || record.id.thomas || 'unknown-' + new Date().getTime();
  },

  getYearsServedInSenate: function(record){
    var years = [];

    if(!this.isSenator(record)){ return years; }

    for(var i=0;i<record.terms.length;i++){
      var term = record.terms[i];

      if(term.type === 'sen'){
        var start = new Date(term.start).getFullYear()
          , end = new Date(term.end).getFullYear();

        for(;start<=end;start++){
          years.push(start);
        }
      }
    }

    return _.uniq(years);
  }
}

