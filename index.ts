// VPC mit öffentlichem Subnet erstellen
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";


// Create a new VPC
const vpc = new aws.ec2.Vpc("my-vpc", {
    cidrBlock: "10.0.0.0/16",
});


const igw = new aws.ec2.InternetGateway("pul-igw", { 
    vpcId: vpc.id 
});

const routeTable = new aws.ec2.RouteTable("pul-route-table", {
    routes: [
        {
            cidrBlock: "0.0.0.0/0", 
            gatewayId: igw.id,
        },
    ],
    vpcId: vpc.id,
});

const subnet = new aws.ec2.Subnet("pul-subnet", {
    vpcId: vpc.id,
    cidrBlock: "10.0.1.0/24",
    mapPublicIpOnLaunch: true, 
    availabilityZone: "eu-central-1a",
});

new aws.ec2.RouteTableAssociation("rta", {
    routeTableId: routeTable.id,
    subnetId: subnet.id,
});


const securityGroup = new aws.ec2.SecurityGroup("pul-sg", {
    vpcId: vpc.id,
    ingress: [
        { protocol: "tcp", fromPort: 80, toPort: 80, cidrBlocks: ["0.0.0.0/0"] },
        { protocol: "tcp", fromPort: 22, toPort: 22, cidrBlocks: ["0.0.0.0/0"] },
    ],
    egress: [
        { protocol: "-1", fromPort: 0, toPort: 0, cidrBlocks: ["0.0.0.0/0"] }
    ],
});

// EC2 instance
const ec2 = new aws.ec2.Instance("pul-ec2", {
    instanceType: "t2.micro",
    vpcSecurityGroupIds: [securityGroup.id], 
    subnetId: subnet.id,
    associatePublicIpAddress: true,
    ami: "ami-0f7204385566b32d0", // Amazon Linux 2 AMI
    userData: `#!/bin/bash
                yum update -y
                yum install docker -y
                service docker start
                usermod -a -G docker ec2-user
                chkconfig docker on
                docker pull stefanprodan/podinfo
                docker run -d -p 80:9898 stefanprodan/podinfo`,
});

export const publicIp = ec2.publicIp;
export const vpcId = vpc.id;

