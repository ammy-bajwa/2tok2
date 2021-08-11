export async function getServerSideProps({ req }) {
    return {
      props: {},
    };
  }
  
  export default function Index({}) {
    return (
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <%- locals?.title %>
    </title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
    <link
        href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900&amp;subset=cyrillic,cyrillic-ext,latin-ext,vietnamese"
        rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
    <script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    <style>
        body {
            font-family: 'Montserrat', sans-serif;
            position: relative;
            height: 100vh;
            background-image: url('/images/background.jpg');
            background-position: center center;
        }

        .bg-dark {
            background-color: rgba(28, 28, 28, 0.95) !important;
            padding: 25px 0 5px 0 !important;
        }

        .card {
            background-color: #212529a8 !important;
            color: #fff;
        }

        .nav-tabs {
            border-bottom: 1px solid #866073c9 !important;
        }

        .nav-tabs a {
            color: #f657c1 !important;
        }

        .nav-tabs a:hover {
            color: #d144ac !important;
        }

        .nav-tabs .nav-link:focus,
        .nav-tabs .nav-link:hover {
            border-color: #d144ac #d144ac #d144ac !important;
        }

        .nav-tabs .nav-item.show .nav-link,
        .nav-tabs .nav-link.active {
            background-color: #545454 !important;
            border-color: #a6388a #dc51b0 #fff0 !important;
        }
        .btn-primary{
            background-color: #007bff99 !important;
        }
        .btn-success{
            background-color: #28a7458c !important;
        }
        .btn-warning{
            background-color: #ffc107a3 !important;
        }
        
    </style>
</head>
<body>
    <div class="wrapper">
        <%- include('../partails/header.ejs') %>
            <div>
                <p style="color: white;">
                    <center style="color: white;">Hello <%= locals?.userName %>
                    </center>
                </p>
            </div>
    </div>
    <main>
        <%- body %>
    </main>
    </div>
</body>

</html>
)}