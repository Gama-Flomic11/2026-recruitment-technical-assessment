# Docker & Kubernetes Assessment Report

> [!TIP]
> Use this document to explain your design choices, optimisations and any challenges you faced.

## Dockerfile
I did not get too far into this task as I left it to late and am not as comfortable with dockerfiles. I wrote something basic following a tutorial and then I proceeded to get import errors with ts and changed some of the .js extensions to typescript but I have a feeling that is because of my install method. I think I could definitely improve by working on dockerfiles a bit more so I am definitely willing to learn and would still be really interested in deploying just really struggled with this task more than the frontend backend I am more familar with.

### Forked repository

<!-- TODO: If you submitted your changes to a fork, replace with your forked repository -->
`https://github.com/your-username/academic-calendar-api`

## Kubernetes

My challenge in this process was primarily learning what I had to do at each stage

I started by actually getting everything installed which for some reason is usually the most challenging aspect of the first 30 hours of learning anything. This install process was smoother than my previous one with typescript on my new machine so a win.

Then looking at the docker compose was quit foreign but what I worked out was I need to change the paths and change the user to something based on the access of the user, I just left it 1000 and changed the paths to folders in my navidrome.

I choose not to change the environments as I am still new to kubernetes so it was a challenge realising that an error was because the file was even included but that is something I will work on in my next kubernetes deploy or just read up on soon.

Once getting through that error I ran the kube commands having minikube installed and my only other error was no kompose server being present in services.metadata of one of the manifested dockercompose files which I changed to navidrome and after restarting my minikube because of another operation running from previous debugging it fixed my final error and opened the program in localhost as directed.



<!-- TODO: Document your process for deploying Navidrome on Kubernetes -->
