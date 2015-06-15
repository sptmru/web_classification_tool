#!/bin/bash
/bin/cat /home/ubuntu/app/uploads/$1 | awk -F',' 'BEGIN{OFS=","} {print $1,$2,$5,$3,$4,$6}' | mongoimport --headerline --type csv --db classification --collection classification
