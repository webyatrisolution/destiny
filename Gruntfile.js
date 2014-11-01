/* jshint node:true */
module.exports = function( grunt ){
	'use strict';

	grunt.initConfig({

		// Setting folder templates.
		dirs: {
			fonts: 'assets/fonts',
			images: 'assets/images',
			styles: 'assets/styles',
			scripts: 'assets/scripts'
		},

		// JavaScript linting with JSHint.
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= dirs.scripts %>/*.js',
				'!<%= dirs.scripts %>/*.min.js'
			]
		},

		// Compile all .scss files.
		sass: {
			options: {
				sourcemap: 'none',
				style: 'expanded',
				loadPath: require( 'node-neat' ).includePaths
			},
			frontend: {
				files: [{
					expand: true,
					cwd: '<%= dirs.styles %>/sass/',
					src: ['*.scss'],
					dest: '<%= dirs.styles %>/css/',
					ext: '.css'
				}]
			}
		},

		// Minify .js files.
		uglify: {
			options: {
				preserveComments: 'some'
			},
			frontend: {
				files: [{
					expand: true,
					cwd: '<%= dirs.scripts %>/frontend/',
					src: [
						'*.js',
						'!*.min.js'
					],
					dest: '<%= dirs.scripts %>/frontend/',
					ext: '.min.js'
				}]
			}
		},

		// Watch changes for assets.
		watch: {
			styles: {
				files: [
					'<%= dirs.styles %>/sass/*.scss'
				],
				tasks: ['sass']
			},
			scripts: {
				files: [
					'<%= dirs.scripts %>/*.js',
					'!<%= dirs.scripts %>/*.min.js'
				],
				tasks: ['uglify']
			}
		},

		// Copy files to deploy.
		copy: {
			deploy: {
				src: [
					'**',
					'!.*',
					'!*.md',
					'!.*/**',
					'!Gruntfile.js',
					'!package.json',
					'!node_modules/**'
				],
				dest: 'deploy',
				expand: true,
				dot: true
			}
		},

		// Clean the directory.
		clean: {
			deploy: {
				src: [ 'deploy' ]
			}
		}
	});

	// Load NPM tasks to be used here
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );

	// Register tasks
	grunt.registerTask( 'default', [
		'sass',
		'uglify'
	]);

	grunt.registerTask( 'deploy', [
		'clean:deploy',
		'copy:deploy'
	]);
};
