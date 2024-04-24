<!-- Aufgabe: bitte erstelle mit Pulumi eine EC2 Instanz in einem (auch mit Pulumi erstellten) VPC mit einem public Subnet. Die EC2 Instanz soll eine public IP-Adresse bekommen und über Pulumi (oder auch Ansible) so konfiguriert werden, dass der Podfinfo Docker Container (https://github.com/stefanprodan/podinfo) auf der Instanz läuft und die Weboberfläche des Containers über die IP abrufbar ist. -->


<!-- Download & install von Pulumi -->
https://www.pulumi.com/docs/install/#download-install-pulumi 

<!-- Projektverzeichnis erstellen  --> -->
mkdir aws-typescript

<!-- Pulumi-Projekt initialisieren  -->
pulumi new aws-typescript

<!-- Erstellen eines VPC, eines öffentlichen Subnets und einer Internet Gateway mit Pulumi

<!-- Erstellen einer EC2-Instanz in diesem VPC. -->

<!-- Erstellen einer Sicherheitsgruppe für die EC2-Instanz mit einem eingehenden HTTP-Zugriff -->

<!-- Konfigurieren der EC2-Instanz, um den Podinfo Docker Container auszuführen. -->

<!-- Konfiguration des Sicherheitsgruppenregel, um den Zugriff auf die Podinfo-Weboberfläche über die öffentliche IP-Adresse zu ermöglichen. --> -->

Pulumi-Code ausführen: pulumi up
