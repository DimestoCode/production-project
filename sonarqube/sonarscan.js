const scanner = require("sonarqube-scanner");

scanner(
    {
        serverUrl: "http://localhost:9000",
        token: "e838dd064de0e78c5c39bcbb23aeb758353944ca",
        options: {
            "sonar.projectName": "Dmytro-Blog",
            "sonar.projectKey": "Dmytro-blog",
            "sonar.login": "sqp_2a7ecce065700816b18213925a9dde3cce042294",
            "sonar.projectVersion": "0.0.1",
            "sonar.exclusions": "**/*.stories.*,build,dist,public,reports",
            "sonar.sourceEncoding": "UTF-8"
        }
    },
    () => process.exit()
);
