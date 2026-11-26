9bel mat3mel ay haja run hade cmds bach tcreate venv l project

```
python -m venv .env
```

hayanstaly requerments bach trun project

```
python -m pip install -r requirements.txt
```
ou moraha run docker compose hit fih postgres lamabgitich roda f config n sqlite ou data katsejel f file ismo postgres_data

```
docker compose up
```

ou ida installiti chi package t9dar trun had cmd bach tzido f requirements.txt blama tzido byedek

```
python -m pip freeze > requirements.txt
```

ou hadi structure dyal file lhad lank

```
.
├── .venv
├── docker-compose.yml
├── ft_trans
│   ├── apps            #dir where we store apps
│   │   ├── clients
│   │   │   ├── models.py
│   │   │   ├── tests.py
│   │   │   ├── urls.py
│   │   │   ├── views.py
│   │   │   └── ....
│   │   └── users
│   │       ├── models.py
│   │       ├── tests.py
│   │       ├── urls.py
│   │       ├── views.py
│   │       └── ...
│   ├── config          #project config
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── ...
│   └── manage.py
├── postgres_data       #directory to store database
├── README.md           #this read me
└── requirements.txt
```
