curl http://192.168.1.20:8084/job/stentor-build/ws/stentor-auth/target/stentor-auth-0.0.1-SNAPSHOT.jar --output stentor-auth-0.0.1-SNAPSHOT.jar
java -jar stentor-auth-0.0.1-SNAPSHOT.jar -Dspring.profiles.active=dev
