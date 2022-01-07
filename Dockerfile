FROM python:3.10

RUN apt-get update
RUN pip install --upgrade pip

COPY src/entrypoint.py /entrypoint.py
COPY requirements.txt /requirements.txt

RUN chmod +x /entrypoint.py

WORKDIR /

RUN pip install -r requirements.txt

ENTRYPOINT ["/entrypoint.py"]

