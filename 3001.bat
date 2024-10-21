@Echo off

:home
cls

c:
cd\

cd inetpub\wwwroot\FactAmdcBack
@npm run start:dev
goto End
