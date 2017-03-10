module.exports = {

	admin: {
		name: '<%= appName %>',
		logo: '<%= appSlug %>',
		default: '<%= appSlug %>'
	},

	api: {
		query: {
			lean: true
		},
		token: {
			secret: '<%= tokenSecret %>',
			expires: 60
		},
		admin: {
			user: {
				name: 'Super Admin',
				email: 'super@admin.com',
				password: '<%= adminPass %>',
				type: 'A'
			}
		}
	},

	middle: {
		basic: {
			enabled: true,
			user: '<%= appSlug %>',
			pass: '<%= basicSecret %>'
		}
	},

	apps: {
		list: [
			{name: 'System', slug: 'system', long: 'System'},
			{name: '<%= appName %>', slug: '<%= appSlug %>', long: '<%= appDesc %>'}
		]
	},

	auth: {
		'<%= appSlug %>': {
			'/api/login': false,
			'/api/token': false,
			'/api/forgot': false,
			'/api/invite': false,
			'/api/invite/:token': false,
			'/api/register': false,
			'/api/resend': false,
			'/api/change_password': false,
			'/api/social': false,
			'/api/waiting/accept': false,
			'/api/waiting/decline': false,
			'/api/waiting/line': false,

			register: {
				// username: 'required|min:2|max:20|alpha_num',
				password: 'required|min:4|max:20',
				no_email_verify: true
			},
			auth: {
				invite_moderation: false,
				invite_expires: 7,
				waiting_list: false
			}
		}
	},

	data: {
		db: {
			enabled: false,
			uri: 'mysql url'
		},
		elasticsearch: {
			enabled: false,
			host: 'localhost',
			port: 9200,
			// auth: 'admin:admin',
			log: 'debug'
		},
		mongo: {
			host: '127.0.0.1',
			port: 27017,
			db: '<%= appSlug %>',
			user: '<%= appSlug %>',
			pass: '<%= mongoPass %>',
			pool: 10,
			autoIndex: true,
			debug: true
		},
		redis: {
			host: '127.0.0.1',
			port: 6379,
			pass: '<%= redisPass %>'
		},
		solr: {
			enabled: false,
			host: 'localhost',
			port: 8983,
			core: 'solrcore'
		}
	},

	logger: {
		transport: 'Console',
		options: {
			level: 'debug',
			humanReadableUnhandledException: false,
			handleExceptions: false,
			json: true,
			colorize: true,
			prettyPrint: true,
			showLevel: true,
			timestamp: true
		}
	},

	resize: {
		'appdomain': [
			'resize options'
		]
	},

	social: {
		'<%= appSlug %>': {
			facebook: {
				enable: false,
				app: 'App Name',
				key: 'api key',
				secret: 'api secret',
				callback: 'http://localhost/api/<%= appSlug %>/facebook/callback',
				success: '/success-url',
				failure: '/failure-url'
			},
			twitter: {
				enable: false,
				app: 'App Name',
				key: 'api key',
				secret: 'api secret',
				callback: 'http://localhost/api/<%= appSlug %>/twitter/callback',
				success: '/success-url',
				failure: '/failure-url'
			},
			instagram: {
				enable: false,
				app: 'App Name',
				key: 'api key',
				secret: 'api secret',
				callback: 'http://localhost/api/<%= appSlug %>/instagram/callback',
				success: '/success-url',
				failure: '/failure-url'
			},
			foursquare: {
				enable: false,
				app: 'App Name',
				key: 'api key',
				secret: 'api secret',
				callback: 'http://localhost/api/<%= appSlug %>/foursquare/callback',
				success: '/success-url',
				failure: '/failure-url'
			}
		}
	},

	upload: {
		type: 's3',
		dir: 'public/upload',
		account: {
			key: 's3 key',
			secret: 's3 secret'
		},
		bucket: 's3 bucket',
		folder: 's3 folder'
	},

	boot: {
		body: {
			urlencoded: {
				extended: true,
				limit: '16mb'
			},
			json: {
				limit: '16mb'
			}
		},
		compress: {},
		cookie: {},
		favicon: {
			fileName: 'favicon.ico'
		},
		forward: {
			'project domain': 'project route prefix'
		},
		mailer: {
			'<%= appSlug %>': {
				service: 'Mailgun',
				auth: {
					user: 'Mailgun user',
					pass: 'Mailgun pass'
				},
				socketTimeout: 60000
			}
		},
		oauthproxy: {
			'api key': 'api secret'
		},
		session: {
			name: '<%= appSlug %>.sid',
			secret: '<%= sessionSecret %>',
			cookie: {
				maxAge: 604800000
			},
			resave: false,
			saveUninitialized: true
		},
		'static': {
			dir: 'public',
			options: {
				maxAge: '1d'
			}
		},
		timezone: {
			'default': 'UTC' // Europe/Istanbul
		},
		view: {
			dir: 'view',
			swig: {
				cache: 'memory'
			}
		}
	},

	sync: {
		data: {
			apps: true,
			roles: true,
			objects: true,
			superadmin: true,
			actions: true,
			userroles: false,
			docs: false,
			superacl: true,
			core: true
		},
		random: {
			model_name: false
		},
		denormalize: {
			model_name: false
		},
		index: {
			model_name: false
		},
        fill_users_apps: {
            'model.name': false
        }
	},

	roles: {
		system: {
			'default': [
				{name: 'Superadmin', slug: 'superadmin'}
			]
		},
		'<%= appSlug %>': {
			'default': [
				{name: 'Admin', slug: 'admin'},
                {name: 'User', slug: 'user'},
                {name: 'Guest', slug: 'guest'}
			],
            initial: {
                register: 'user'
            },
			actions: {
				admin: {}
			}
		}
	},

	mail: {
		'<%= appSlug %>': {
			baseUrl: 'http://baseurl/',
			domains: [],
			endpoints: {
				reset: 'reset',
				invite: 'invite',
				register: 'verify'
			},
			reset: {
				from: 'App Name <app@app.com>',
				subject: 'Reset Password'
			},
			invite: {
				from: 'App Name <app@app.com>',
				subject: 'App Invitation'
			},
			register: {
				from: 'App Name <app@app.com>',
				subject: 'App Register'
			},
			'waiting/accept': {
				from: 'App Name <app@app.com>',
				subject: 'Account Accepted'
			},
			'waiting/decline': {
				from: 'App Name <app@app.com>',
				subject: 'Account Declined'
			}
		}
	}

};
