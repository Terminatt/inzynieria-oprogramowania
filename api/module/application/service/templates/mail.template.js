module.exports = `<!doctype html>

<html lang="en">

<head>
    <meta charset="utf-8">

    <title><%= mailTitle %></title>
    <meta name="description" content="Ebooki">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;1,600&display=swap');
</style>

<body style="margin: 0; padding: 0; font-family: 'Nunito', sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <%= content %>
    </table>
</body>

</html>`