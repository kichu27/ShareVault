import nodemailer from 'nodemailer'
import { User } from '@/Models/UserModel'
import bcryptjs from 'bcryptjs'
import { NextResponse } from 'next/server'
import Connect from '../Database/dbconn'

export async function sendemail(email , emailtype , UserID)
{


try {
    
await Connect() ; 

const hashedToken = await bcryptjs.hash(UserID.toString() , 10)

if (emailtype ==="VERIFY") {
    
    await User.findByIdAndUpdate(UserID , {verifyToken:hashedToken , verifyTokenExpiry:Date.now()+360000  })


} else if (emailtype === "RESET") {
    
    await User.findByIdAndUpdate(UserID , {forgotPasswordToken:hashedToken , forgotPasswordTokenExpiry:Date.now()+360000  })

}


var transport = nodemailer.createTransport({
    service  : "gmail" , 
    port : 465 , 
    secure  : true ,
    logger : true , 
    debug : true , 
    secureConnection :false ,  
    auth: {
      user : "kartikpatekar27@gmail.com"   , 
      pass: "nxgt kpym nrvp xzij"
    } , 

    tls : {


      rejectUnauthorized : true 
    }
  }); 

 
    const mailOptions = {
        from:'kartikpatekar27@gmail.com',
        to: email,
        subject: emailtype === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
        <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="x-apple-disable-message-reformatting">
          <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
          <title></title>
          
            <style type="text/css">
              @media only screen and (min-width: 620px) {
          .u-row {
            width: 600px !important;
          }
          .u-row .u-col {
            vertical-align: top;
          }
        
          .u-row .u-col-100 {
            width: 600px !important;
          }
        
        }
        
        @media (max-width: 620px) {
          .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
          .u-row {
            width: 100% !important;
          }
          .u-col {
            width: 100% !important;
          }
          .u-col > div {
            margin: 0 auto;
          }
        }
        body {
          margin: 0;
          padding: 0;
        }
        
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
        
        p {
          margin: 0;
        }
        
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
        
        * {
          line-height: inherit;
        }
        
        a[x-apple-data-detectors='true'] {
          color: inherit !important;
          text-decoration: none !important;
        }
        
        table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_heading_1 .v-container-padding-padding { padding: 40px 10px 0px !important; } #u_content_heading_1 .v-font-size { font-size: 28px !important; } #u_content_text_1 .v-container-padding-padding { padding: 0px 10px 10px !important; } }
            </style>
          
          
        
        <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Cabin:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
        
        </head>
        
        <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ecf0f1;color: #000000">
          <!--[if IE]><div class="ie-container"><![endif]-->
          <!--[if mso]><div class="mso-container"><![endif]-->
          <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ecf0f1;width:100%" cellpadding="0" cellspacing="0">
          <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ecf0f1;"><![endif]-->
            
          
          
        <div class="u-row-container" style="padding: 0px;background-color: transparent">
          <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
              
        <!--[if (mso)|(IE)]><td align="center" width="580" style="background-color: #ffffff;width: 580px;padding: 0px;border-top: 10px solid #ff2828;border-left: 10px solid #ff2828;border-right: 10px solid #ff2828;border-bottom: 10px solid #ff2828;" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
          <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
          <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 10px solid #ff2828;border-left: 10px solid #ff2828;border-right: 10px solid #ff2828;border-bottom: 10px solid #ff2828;"><!--<![endif]-->
          
        <table id="u_content_heading_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:61px 10px 0px;font-family:'Raleway',sans-serif;" align="left">
                
          <!--[if mso]><table width="100%"><tr><td><![endif]-->
            <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 30px; font-weight: 400;"><span>SKILL-SAIL AUTHENTICATION</span></h1>
          <!--[if mso]></td></tr></table><![endif]-->
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:'Raleway',sans-serif;" align="left">
                
          <!--[if mso]><table width="100%"><tr><td><![endif]-->
            <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: trebuchet ms,geneva; font-size: 16px; font-weight: 400;"><span><span><span><strong><br />Mastering Skills Await!<br /><br /></strong></span></span></span></h1>
          <!--[if mso]></td></tr></table><![endif]-->
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table id="u_content_text_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 50px 10px;font-family:'Raleway',sans-serif;" align="left">
                
          <div class="v-font-size" style="font-family: 'Cabin',sans-serif; font-size: 16px; line-height: 140%; text-align: center; word-wrap: break-word;">
            <p style="line-height: 140%;"><span style="background-color: #ffffff; line-height: 19.6px; color: #000000;"><span style="float: none; display: inline; line-height: 19.6px;">Take a step closer to mastering new skills with Skill Sail! Visit our website, sign up for an account, and explore our extensive course catalog tailored to enhance your abilities in various fields. Enroll in courses taught by industry experts, engage with our vibrant learning community, and complete practical assignments to gain real-world experience. Earn certificates to showcase your achievements and stay updated with our latest offerings. Join Skill Sail today and unlock your full potential!</span> </span></p>
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;" align="left">
                
          <div>
            <div style="display: flex; flex-direction: column; align-items:center;">
          <p>Click
            
              <a href="http://localhost:3000/verifyemail?token=${hashedToken}">here</a>
         
            to ${emailtype === 'VERIFY' ? 'verify your email' : 'reset your password'}
          </p>
        
        </div>
        
        <div style="display: flex; flex-direction: column; align-items: center;">
          <p style ="margin-top : 5px ; margin-bottom :5px">or copy and paste the link in your browser.</p>
          <h4>"http://localhost:3000/verifyemail?token=${hashedToken}</h4>
        </div>
        
          </div>
        
              </td>
            </tr>
          </tbody>
        </table>
        
        <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
          <tbody>
            <tr>
              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Raleway',sans-serif;" align="left">
                
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding-right: 0px;padding-left: 0px;" align="center">
              
              <img align="center" border="0" src="https://cdn.templates.unlayer.com/assets/1715166019480-Mask%20group.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 70%;max-width: 420px;" width="420"/>
              
            </td>
          </tr>
        </table>
        
              </td>
            </tr>
          </tbody>
        </table>
        
          <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
          </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
              <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
          </div>
          </div>
          
        
        
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
          </tbody>
          </table>
          <!--[if mso]></div><![endif]-->
          <!--[if IE]></div><![endif]-->
        </body>
        
        </html>
        

      `,
    }

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;

} catch (error) {
console.log(error);
    return NextResponse.json({status:400 , message:"Email verification failed !" , success : false})
    
}








}