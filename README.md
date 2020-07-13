# TITLE

> A Dashboard for KBase Users.

This Dashboard provides a set of widgets which provide insight into a user's KBase world - Narratives, Organizations, Jobs, Apps - customizable by the user to support the way they use KBase.

## Usage

This is provided as a kbase-ui plugin; as such, it is incorporated into the kbase-ui web app, which is canonically available at https://narrative.kbase.us#dashboard4.

## Install

INSTALLATION OF DEPENDENCIES, THE THING ITSELF

## Audience

As a kbase-ui plugin, this repo is really designed for KBase developers who maintain the kbase-ui web app.

As a [KBase](https://kbase.us) user, you may be interested in the bits and pieces that make up the service.

## Background

At present, KBase is composed of two primary user interfaces. The [Narrative](https://kbase.us/narrative) - the primary user-facing product, the purpose, the raison d'être of KBase - is a tool for creating, running, and sharing genomics-oriented systems biology projects. The [kbase-ui](https://kbase.us/kbase-ui) is a collection of tools collected into one web app, the purpose of which is to support KBase Narrative users. This repo is related to the latter.

In kbase-ui, tools are integrated as "plugins". Each plugin is dedicated to a single overall purpose. Plugins include login, account management, search, app catalog, object visualization, organizations, notification feeds, and so on.

The project you are looking at is a plugin dedicated to providing a "dashboard" type of user experience. It provides a collection of small widgets, each itself dedicated to providing insight and/or timeline information about an aspect of the user's interface with KBase. This includes Narratives (recently updated, recently added, etc.), apps (recently added, most active, etc.), jobs (currently running, job history), organizations (most active orgs, new orgs), and so forth. The list of widgets, and their options, will continue to grow.

## Features

- widgets for: Narratives, Apps, Jobs, Orgs, Feeds, Users
- any number of instances of widgets
- widgets provide live info for their respective services
- widgets are configurable, customizable
- widget settings and layout saved in user account

## Status

Currently under development, not released

## Acknowledgments

- KBase Developers

## See Also

- [KBase](https://kbase.us)
- [Developer Documentation](https://kbase.us/kbaseIncubator/kbase-ui-docs)

## License

SEE LICENSE IN LICENSE
