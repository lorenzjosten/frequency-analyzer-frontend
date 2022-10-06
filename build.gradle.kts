import com.github.gradle.node.yarn.task.YarnTask

defaultTasks(":run")

plugins {
    alias(libs.plugins.node.gradle)
}

group = "io.github"
version = "1.0"

repositories {
    mavenCentral()
}

val packedUi by configurations.creating {
    isCanBeConsumed = true
    isCanBeResolved = false
}

val run by tasks.registering(YarnTask::class) {
    dependsOn(tasks.npmInstall)
    yarnCommand.set(listOf("serve:prod"))
}

val build by tasks.registering(YarnTask::class) {
    dependsOn(tasks.npmInstall)
    yarnCommand.set(listOf("build:prod"))
    inputs.dir("src")
    outputs.dir("dist")
}

val pack by tasks.registering(Zip::class) {
    group = "node"
    dependsOn(build)
    archiveFileName.set("ui.zip")
    destinationDirectory.set(buildDir)
    from(build)
}

val clean by tasks.registering(YarnTask::class) {
    dependsOn(tasks.npmInstall)
    delete("dist", "build")
    yarnCommand.set(listOf("cache", "clean"))
}

artifacts {
    add("packedUi", pack)
}

node {
    download.set(true)
}
