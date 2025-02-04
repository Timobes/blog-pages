<?
    if($_SERVER["REQUEST_METHOD"] === "POST") {
        $id = uniqid();

        $file_name = "../pages/$id.html";
        $postContent = "Заголовок: $title\n\nСодержимое:\n$content\n\nСсылка на полный пост: http://yourdomain.com/blog/$id.txt";

        file_put_contents($file_name, $postContent);
    } 
?>