require "pathname"

module Jekyll
	class SourceCodeTag < Liquid::Tag

		LANGUAGE_MAP = {
			".html" => "html",
			".htm" => "html",
			".js"  => "javascript",
			".mjs" => "javascript",
			".cjs" => "javascript",
			".ts" => "typescript",
			".css" => "css",
			".scss" => "scss",
			".py" => "python",
			".rb" => "ruby",
			".java" => "java",
			".c" => "c",
			".cpp" => "cpp",
			".h" => "c",
			".go" => "go",
			".rs" => "rust",
			".sql" => "sql",
			".json" => "json",
			".yml" => "yaml",
			".yaml" => "yaml",
			".sh" => "bash",
			".md" => "markdown",
			".xml" => "xml",
			".txt" => "text"
		}.freeze

		def initialize(tag_name, markup, tokens)
			super
			@file = markup.strip.gsub(/\A["']|["']\z/, "")
		end

		def render(context)
			site = context.registers[:site]
			page = context.registers[:page]

			site_root = File.realpath(site.source)
			
			# 절대 경로와 상대 경로 구분
			if @file.start_with?("/")
				requested_path = File.join(site_root, @file.delete_prefix("/"))
			else
				page_path = page["path"]
				
				unless page_path
					raise Liquid::Error, "Cannot determine current page path"
				end

				page_dir = File.dirname(
					File.join(site_root, page_path)
				)

				requested_path = File.expand_path(@file, page_dir)
			end

			# 실제 경로 확인 (심볼릭 링크 포함)
			begin
				file_path = File.realpath(requested_path)
			rescue Errno::ENOENT
				raise Liquid::Error, "Source file not found: #{@file}"
			end

			# 프로젝트 루트 외부 접근 방지
			unless file_path.start_with?(site_root + File::SEPARATOR)
				raise Liquid::Error, "Access denied: #{@file}"
			end

			unless File.file?(file_path)
				raise Liquid::Error, "Not a file: #{@file}"
			end

			extension = File.extname(file_path).downcase
			language = LANGUAGE_MAP[extension]

			unless language
				raise Liquid::Error, "Unsupported source extension: #{extension}"
			end

			# 파일 원문 읽기
			code = File.read(file_path, encoding: "UTF-8")

			# 소스 안에 있는 코드 펜스보다 긴 펜스 생성
			max_ticks = code.scan(/`+/).map(&:length).max || 0
			fence = "`" * [3, max_ticks + 1].max

			output = +"#{fence}#{language}\n"
			output << code
			output << "\n" unless code.end_with?("\n")
			output << "#{fence}\n"

			output
		end
	end
end

Liquid::Template.register_tag(
	"source_code",
	Jekyll::SourceCodeTag
)
