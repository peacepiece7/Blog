#!/bin/bash

branch=$(git branch --show-current)

if [ "$branch" == "main" ]; then
    exit 1
elif [ "$branch" == "develop" ]; then
    exit 1
else
    exit 0
fi