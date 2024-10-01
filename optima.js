[SQL]
@PAR ?@HS50|CDN_GUID|Id:0@? PAR@
    SELECT  Atr.DAt_TrnID, Atr.DAt_WartoscTxt, Atr.DAt_Kod, Trn.TrN_NumerPelny
    FROM CDN.RptZaznaczenia2 R
    INNER JOIN CDN.DokAtrybuty Atr ON Atr.DAt_TrnID = R.RpZ2_GIDNumer
    INNER JOIN CDN.TraNag Trn ON Trn.TRn_TrnID = R.RpZ2_GIDNumer
    WHERE R.RpZ2_GUID = ??CDN_GUID


[JS]
var records = \{}; // Object to store data for each TrnID

while (!Recordset.EOF) \{
    var trnId = Recordset.Fields("DAt_TrnID").Value;
    var data = Recordset.Fields("DAt_WartoscTxt").Value;
    var kod = Recordset.Fields("DAt_Kod").Value;
    var numer = Recordset.Fields("TrN_NumerPelny").Value;

    // Ensure the TrnID exists in the records object
    if (!records[trnId]) \{
        records[trnId] = \{
            D3_WYW: null,
            D2_DOSTAWA: null,
            NR: null,
            PLAN_GODZ: null // Add PLAN_GODZ property
        \};
    \}
    records[trnId].NR = numer;
    // Assign data to the correct KOD based on the value of KOD
    if (kod === "D3_WYW") \{
        records[trnId].D3_WYW = data;
    \} else if (kod === "D2_DOSTAWA") \{
        records[trnId].D2_DOSTAWA = data;
    \} else if (kod === "PLAN_GODZ") \{ // Check for PLAN_GODZ
        records[trnId].PLAN_GODZ = data;
    \}

    Recordset.moveNext();
\}

var shell = new ActiveXObject("WScript.Shell");

for (var TrnID in records) \{
    var record = records[TrnID];
    var command = "node F:\\TRELLO\\main.js " + record.NR + " " + record.D2_DOSTAWA + " " + record.D3_WYW + " " + record.PLAN_GODZ;
    
    // Display the popup message
    shell.Popup('Command: ' + command, 0, 'TEST', 64);
    
    var exitCode = shell.Run(command, 1, true);
\}